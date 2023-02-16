import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	getPublicUrl, genericResponse,
} from '../shared/helpers';
import { ChatDto, ChatMessage } from '../../../lib/dto/Chat.dto';

import AWS from 'aws-sdk';
import { bucketFolders } from '../shared/enums';
const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';

import { initDB } from '../shared/db';
import { User } from '../shared/models/User';
import {UnreadChat} from "../shared/models/UnreadChat";
import {CreateChat} from "../../typings/CreateChat";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	const body = event?.body;

	try {
		const chatEntry = await UnreadChat.findOne({
			where: {
				recipientUid: uid, chatUid: body.chatId
			}
		});

		if (!chatEntry) {
			return badRequestReturn();
		}

		await chatEntry.destroy();

		return genericResponse(true);
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
