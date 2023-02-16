import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	anInternalError,
	anInternalErrorResponse,
	aBadRequestResponse
} from '../shared/helpers';
import { v4 as uuid } from 'uuid';

import AWS from 'aws-sdk';
import {initDB} from "../shared/db";
import {UnreadChat} from "../shared/models/UnreadChat";
import { User } from '../shared/models/User';

import sendNewMessage from "../shared/mails/sendNewMessage";
import {ChatService} from "./ChatService";
const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);

	const uid = event.requestContext.authorizer.uid;
	const { chatID: chatIDbody, message, recipientUid } = JSON.parse(event.body);

	try {
		// Check if user is member of stated chatID
		let chatID = chatIDbody;
		if (!chatID) {
			console.log("Seems to be a new chat. Lets check it!");

			const tmpChatId = await ChatService.getChatId(uid, recipientUid);
			if (tmpChatId) {
				console.log("Actually found a chat!");
				chatID = tmpChatId;
			} else {
				chatID = await ChatService.createChat(uid, recipientUid);
			}
		}

		const members = await DC.query({
			TableName,
			KeyConditionExpression: `chatID = :chatID AND begins_with (sortKey, :sortKey)`,
			ExpressionAttributeValues: {
				':chatID': chatID,
				':sortKey': 'MEMBER_',
			},
		}).promise();

		if (!members.Items) {
			return anInternalErrorResponse(callback, 'no members in chat found');
		}

		const chatMember = members.Items.find( el => {
			return el.sortKey === 'MEMBER_' + uid
		});

		const chatRecipient = members.Items.find(el => {
			return el.sortKey !== `MEMBER_${uid}`
		});

		if (!chatMember) {
			return aBadRequestResponse(callback, `[SENDER] User: ${uid} does not exist in Chat: ${chatID} or Chat does not exist at all`);
		}

		if (!chatRecipient) {
			return anInternalErrorResponse(callback,'[RECIPIENT] with chat id ' + chatID + ' and sender id ' + uid + ' not found.')
		}

		// Add message to DB
		await DC.put({
			TableName,
			Item: {
				chatID,
				sortKey: `MESSAGE_${uuid()}`, // TODO why??
				message,
				createdAt: Date.now(),
				sender: uid,
			},
		}).promise();


		const recipientId = chatRecipient && chatRecipient.sortKey.replace('MEMBER_','');

		const found = await UnreadChat.findAll({
			where: {
				recipientUid: recipientId,
				chatUid: chatID,
			}
		});
		console.log("Found unread entries:", found);

		if (found.length === 0) {
			const res = await UnreadChat.upsert({
				recipientUid: recipientId,
				chatUid: chatID,
			});
		}

		const user = await User.findOne({
			where: {
				uid: recipientId
			}
		});
		if (!user){
			return badRequestReturn('No user found with recipientId')
		}

		await sendNewMessage(user.email, {
			firstName: user.firstName
		});

		return {
			statusCode: 200,
		};
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
