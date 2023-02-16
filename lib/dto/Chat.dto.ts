export interface ChatDto {
	uid: string;

	member: {
		uid: string;
		firstName: string;
		lastName: string;
		artistName: string;
		company: string;
		profileImage: string;
		slug: string;
		userType: number;
	}

	messages: ChatMessage[];
}

export interface UnreadChatDto {
	recipientUid: string;
	chatUid: string;
}

export interface ChatMessage {
	chatID: string;
	uid: string;
	senderUid: string;
	message: string;
	createdAt: number;
	recipient: string;
}
