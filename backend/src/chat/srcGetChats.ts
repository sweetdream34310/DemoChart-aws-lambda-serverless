import { Handler } from 'aws-lambda';
import {
	startupRoutine,
	badRequestReturn,
	getPublicUrl, genericResponse, anInternalErrorResponse,
} from '../shared/helpers';
import { ChatDto, ChatMessage } from '../../../lib/dto/Chat.dto';

import AWS from 'aws-sdk';
import { bucketFolders } from '../shared/enums';
const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';

import { initDB } from '../shared/db';
import { User } from '../shared/models/User';
import {ChatService} from "./ChatService";
initDB();

export const handler: Handler = async (event, context, callback) => {
	startupRoutine(event);
	const uid = event?.cognitoPoolClaims?.sub;

	try {
		const chatsIDs = await ChatService.getUsersChatIds(uid);
		const chatItems = chatsIDs?.Items;
		console.log("ChatIds", chatsIDs);
		console.log("Chats (ChatItems)", chatItems);

		if (!chatsIDs || !chatItems) { return genericResponse(true); }

		let polishedChats = await Promise.all(
			chatItems.map(async (e) => {
				const chat = await ChatService.getChat(e.chatID);
				console.log(chat);

				const chatDTO = ChatService.createEmptyChatDTO();


				chat.forEach((e) => {
					console.log("chat element", e);
					if (e.sortKey.startsWith('MEMBER_') && e.sortKey !== `MEMBER_${uid}`) {
						// If item is a member add it as recipient
						const member = e.sortKey.split('_')[1];
						chatDTO.uid = e.chatID;
						chatDTO.member.uid = member;
					} else if (e.sortKey.startsWith('MESSAGE_')) {
						// If item is a message add it to the messages array
						chatDTO.messages.push({
							chatID: e.chatID,
							uid: e.sortKey.split('_')[1],
							message: e.message,
							senderUid: e.sender,
							createdAt: e.createdAt,
							recipient: "",
						});
					}

					// Sort messages TODO sort them in db lol
					chatDTO.messages = chatDTO.messages.sort(
						(a, b) => a.createdAt - b.createdAt
					);
				});

				console.log("ChatDTO temp:", chatDTO);
				return chatDTO;
			})
		);

		console.log("Chats and Messages", polishedChats);

		// Map user information to chat entries
		polishedChats = await Promise.all(
			polishedChats.map(async (chat) => {
				const user = await User.findOne({
					where: {
						uid: chat.member.uid,
					},
				});

				chat.member.firstName = user?.firstName || '';
				chat.member.lastName = user?.lastName || '';
				chat.member.artistName = user?.artistName || '';
				chat.member.company = user?.company || '';
				chat.member.slug = user?.slug || '';
				chat.member.userType = user?.userType || -1;
				chat.member.profileImage = user?.profileImageSrc || '';
				return chat;
			})
		);

		return polishedChats;
	} catch (e) {
		console.error(e);
		return badRequestReturn();
	}
};
