import {Handler, DynamoDBStreamEvent, StreamRecord} from 'aws-lambda';
import { getPublicUrl, startupRoutine } from '../shared/helpers';

import AWS from 'aws-sdk';

import { WsClient } from './helpers';
import { bucketFolders } from '../shared/enums';
import {ChatService} from "./ChatService";
import {User} from "../shared/models/User";
import Sequelize, {Op} from "sequelize";
import { initDB } from '../shared/db';
import {ChatMessage} from "../../../lib/dto/Chat.dto";
initDB();

export const handler: Handler = async (event: DynamoDBStreamEvent) => {
	startupRoutine(event);

	async function onNewMessage(dynamodb: StreamRecord) {

		const newImage = dynamodb.NewImage;
		const sortKey = newImage?.sortKey.S;
		const chatID = newImage?.chatID.S;

		console.log("newImage", newImage);
		console.log("sortKey", sortKey);

		if (!chatID || !newImage || !(sortKey && sortKey.startsWith('MESSAGE_'))) {
			return;
		}

		const members = await ChatService.getChatMembers(chatID);

		console.log('fetched all chat members');
		console.log(members);

		const memberUids = await ChatService.getChatMemberUids(chatID);

		console.log('member uids:');
		console.log(memberUids);


		const users = await User.findAll({
			where: {
				uid: {
					[Sequelize.Op.in]: memberUids,
				},
			},
		});

		const usersOnline = users.filter(user => user.wsSessionId !== null);
		const usersOffline = users.filter(user => user.wsSessionId === null);

		console.log("Online user:", usersOnline);
		console.log("Offline user:", usersOffline);


		const wsClient = new WsClient();

		const message = newImage.message.S || '';
		const sender = newImage.sender.S || '';
		const createdAt = newImage.createdAt.N || 0;
		const recipient = memberUids.find(el => el !== sender) || '';

		await Promise.all(
			usersOnline.map(user => {
				const chatMessageDTO: ChatMessage = {
					chatID,
					uid: sortKey.split('_')[1],
					senderUid: sender,
					message,
					recipient,
					createdAt: Number(createdAt),
				};

				return wsClient.send(user.wsSessionId, chatMessageDTO);
			})
		);

	}

	const result = event.Records.map(async ({ eventName, dynamodb }) => {
		if (!dynamodb){ return }

		if (eventName === 'MODIFY') {
			// ...
		} else if (eventName === 'REMOVE') {
			// ...
		} else if (eventName === 'INSERT') {
			await onNewMessage(dynamodb)
		}
	});

	await Promise.all(result);
	return {
		statusCode: 200,
	};
};
