import { Handler } from 'aws-lambda';
import { startupRoutine, badRequestReturn } from '../shared/helpers';
import { CreateChat } from 'typings/CreateChat';
import { v4 as uuid } from 'uuid';

import AWS from 'aws-sdk';
const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';

export const handler: Handler = async (event) => {
	startupRoutine(event);
	const body: CreateChat = event?.body;
	const uid = event?.cognitoPoolClaims?.sub;

	// Add uid of user to the participants array
	const participants = [uid, ...body.participants];

	const tempChatIDs = (
		await Promise.all(
			participants.map(async (uid) => {
				return DC.query({
					TableName,
					IndexName: 'sortKey-Index',
					KeyConditionExpression: `sortKey = :sortKeyVal `,
					ExpressionAttributeValues: {
						':sortKeyVal': `MEMBER_${uid}`,
					},
				})
					.promise()
					.then((res) => res?.Items?.map((e) => e.chatID));
			})
		)
	).flatMap((e) => e);

	console.log(tempChatIDs);

	const duplciates = tempChatIDs.filter(
		(item, index) => tempChatIDs.indexOf(item) != index
	);

	console.log(duplciates);

	let chatID: string;

	if (duplciates.length) {
		chatID = duplciates[0];
	} else {
		// Create a new chatID
		chatID = uuid();
	}

	// Add all participants to the chatroom
	const params = {
		RequestItems: {
			[TableName]: participants.map((e) => ({
				PutRequest: {
					Item: {
						chatID,
						sortKey: `MEMBER_${e}`,
					},
				},
			})),
		},
	};

	try {
		await DC.batchWrite(params).promise();
		console.log('Chat successfully created');
		return { chatID };
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
