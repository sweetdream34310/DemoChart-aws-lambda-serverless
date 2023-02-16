import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';

import {ChatDto, ChatMessage, UnreadChatDto} from '../../../../lib/dto/Chat.dto';
import { tap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import {GetChats, AddMessage, GetUnreadChats, LocalMarkChatAsRead, AddChatContacts} from './chat.actions';

export interface ChatStateModel {
	chats: ChatDto[];
	chatInitialLoaded: boolean;
	unreadChats: UnreadChatDto[];
}

@State<ChatStateModel>({
	name: 'chat',
	defaults: {
		chats: [],
		chatInitialLoaded: false,
		unreadChats: [],
	},
})
@Injectable()
export class ChatState {
	constructor(private http: HttpService) {}

	@Action(GetChats)
	getChats({ patchState }: StateContext<ChatStateModel>) {
		return this.http.getChats().pipe(
			tap((chats) => {

				console.log(chats);
				patchState({
					chats: chats.filter(el => el.member.uid !== '1'), // TODO undo quickfix
					chatInitialLoaded: true
				});
			})
		);
	}



	@Action(AddChatContacts)
	addChatContact({ patchState, getState }: StateContext<ChatStateModel>, { chat }: AddChatContacts) {
		const chats = getState().chats;

		console.log("Add Chat contacts")
		console.log("args", chat)
		if (!chats.find(el => el.member.uid === chat.member.uid)){
			patchState({
				chats: [ ...chats, chat],
			});
		}

	}

	@Action(GetUnreadChats)
	getUnreadChats({ patchState }: StateContext<ChatStateModel>) {
		return this.http.getUnreadChats().pipe(
			tap((res) => {
				patchState({
					unreadChats: res,
				});

				console.log("unread chats:", res);

				document.title = res.length > 0 ? `Democharts (${res.length})` : `Democharts`;
			})
		);
	}


	@Action(LocalMarkChatAsRead)
	localMarkChatAsRead({ patchState, getState }: StateContext<ChatStateModel>, { chatId }: LocalMarkChatAsRead) {
		const newUnread = getState().unreadChats.filter(el => el.chatUid !== chatId);

		patchState({
			unreadChats: newUnread,
		});

		document.title = newUnread.length > 0 ? `Democharts (${newUnread.length})` : `Democharts`;
	}

	@Action(AddMessage)
	addMessage(
		{ getState, setState }: StateContext<ChatStateModel>,
		{ payload }: AddMessage
	) {
		console.log("ON ADD MESSAGE", payload);
		const chats = getState().chats;
		let chat = chats.find((e) => e.uid === payload.chatID);
		const chatRecipient = chats.find((e) => e.member.uid === payload.recipient);

		if (!chat && !chatRecipient){
			console.log("Chat with id and recipient not found. Chats not loaded?", payload.chatID, payload.recipient);
			return;
		}

		if (!chat) {
			chat = chatRecipient;
		}

		const messages = [...chat.messages, payload];
		setState(
			patch({
				chats: updateItem(
					(item: ChatDto) => item.uid === payload.chatID || item.member.uid === payload.recipient,
					patch({ ...chat, messages })
				),
			})
		);
	}
}
