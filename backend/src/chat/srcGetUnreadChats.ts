import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	getPublicUrl,
} from '../shared/helpers';
import { ChatDto, ChatMessage } from '../../../lib/dto/Chat.dto';

import AWS from 'aws-sdk';
import { bucketFolders } from '../shared/enums';
const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';

import { initDB } from '../shared/db';
import { User } from '../shared/models/User';
import {UnreadChat} from "../shared/models/UnreadChat";
initDB();

export const handler: Handler = async (event) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	try {
		const allEntries = await UnreadChat.findAll({})

		const entries = await UnreadChat.findAll({
			where: { recipientUid: uid },
		});

		return entries;

	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
