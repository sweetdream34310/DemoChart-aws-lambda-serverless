
import AWS from "aws-sdk";
import {ChatDto, ChatMessage} from "../../../lib/dto/Chat.dto";
import {v4 as uuid} from "uuid";
import {badRequestReturn} from "../shared/helpers";

const DC = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DB_NAME || '';

interface ChatMembers {
    Items: [
        {
            sortKey: string,
            chatID: string,
        }
    ],
    Count: number,
    ScannedCount: number,
}

export class ChatService {

    static createEmptyChatDTO = () : ChatDto => {
        return {
            uid: '',
            member: {
                uid: '',
                firstName: '',
                lastName: '',
                artistName: '',
                company: '',
                profileImage: '',
                slug: '',
                userType: -1
            },
            messages: new Array<ChatMessage>(),
        };
    };

    static getUsersChatIds = (uid: string) => {
        return DC.query({
            TableName,
            IndexName: 'sortKey-Index',
            KeyConditionExpression: `sortKey = :sortKeyVal `,
            ExpressionAttributeValues: {
                ':sortKeyVal': `MEMBER_${uid}`,
            },
        }).promise();
    };

    static getChat = async (chatID: string) => {
        return DC.query({
            TableName,
            KeyConditionExpression: `chatID = :chatID`,
            ExpressionAttributeValues: {
                ':chatID': chatID,
            },
        })
            .promise()
            .then((e) => e.Items || [])
    };

    static getChatMembers = (chatID: string) => {
        return DC.query({
            TableName,
            KeyConditionExpression: `chatID = :chatID AND begins_with (sortKey, :sortKey)`,
            ExpressionAttributeValues: {
                ':chatID': chatID,
                ':sortKey': 'MEMBER_',
            },
        }).promise()
    };

    static getChatMemberUids = async (chatID: string): Promise<string[]> => {
        const members = await ChatService.getChatMembers(chatID);

        if (!members.Items) { return [] }

        return members.Items.map(el => {
            return el.sortKey.replace('MEMBER_', '')
        })
    };


    static getChatId = async(uid1: string, uid2: string) => {
        // Add uid of user to the participants array
        const participants = [uid1, uid2];

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

        const duplicates = tempChatIDs.filter(
            (item, index) => tempChatIDs.indexOf(item) != index
        );

        console.log(duplicates);

        if (duplicates.length) {
            return duplicates[0];
        } else {
            return undefined;
        }
    };


    static createChat = async(senderUid: string, recipientUid: string) => {
        const chatID = uuid();

        // Add all participants to the chatroom
        const participants = [senderUid, recipientUid];
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
            return chatID;
        } catch (e: any) {
            console.error(e);
            throw new Error(e);
        }
    }

};