import {ChatDto, ChatMessage} from '../../../../lib/dto/Chat.dto';

export class GetChats {
	static readonly type = '[Chat] get chats';
	constructor() {}
}

export class AddChatContacts {
	static readonly type = '[Chat] add chat contact';
	constructor(public chat: ChatDto) {}
}

export class GetUnreadChats {
	static readonly type = '[User] get unread chat data of the user';
	constructor() {}
}

export class AddMessage {
	static readonly type = '[Chat] add message';
	constructor(public payload: ChatMessage) {}
}

export class LocalMarkChatAsRead {
	static readonly type = '[Chat] local mark chat as read';
	constructor(public chatId: string) {}
}
