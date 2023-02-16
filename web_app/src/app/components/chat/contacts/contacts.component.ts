import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ChatDto, UnreadChatDto} from '../../../../../../lib/dto/Chat.dto';
import { Observable, of } from 'rxjs';
import {Select, Store} from '@ngxs/store';
import { GetChats } from 'src/app/state/chat.actions';
import {getProfileImage} from '../../../helpers/getPublicUrl';
import {InitApp, SetNavigationTitle} from "../../../state/app.actions";

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
	@Input() chats$: Observable<ChatDto[]> = of([]);
	@Input() inChat = false;
	@Output() inChatChange: EventEmitter<boolean> = new EventEmitter();
	@Output() selectChat: EventEmitter<ChatDto> = new EventEmitter();
	@Input() selectedChat: ChatDto;

	@Select((state) => state.app.chat.unreadChats) unreadChats$: Observable<UnreadChatDto[]>;
	unreadChats: UnreadChatDto[] = [];
	sortedChats: ChatDto[];


	constructor(private store: Store) {
		this.store.dispatch(new SetNavigationTitle('Contacts'));

	}

	ngOnInit(): void {

		this.unreadChats$.subscribe(el => this.unreadChats = el);

		this.chats$.subscribe((chats) => {
			console.log("CHATS", chats)
			this.sortedChats = JSON.parse(JSON.stringify(chats)).sort((firstChat, secondChat): number => {
					const lastMessageFirst = firstChat.messages.length > 0 && firstChat.messages[firstChat.messages.length - 1].createdAt;
					const lastMessageSecond = secondChat.messages.length > 0 && secondChat.messages[secondChat.messages.length - 1].createdAt;
					if (!lastMessageFirst || !lastMessageSecond) {
						return 1;
					}
					console.log(lastMessageSecond, lastMessageFirst, (lastMessageSecond - lastMessageFirst))
					return lastMessageSecond - lastMessageFirst;
				}
			);
		});
	}

	openChat(chat: ChatDto) {
		this.inChatChange.emit(true);
		this.selectChat.emit(chat);
	}

	trackByChats(index, item) {
		return item.uid;
	}


	isChatUnread(chatId: string): boolean {
		return this.unreadChats.find(el => el.chatUid === chatId) !== undefined;
	}

	get getChats() {
		return this.sortedChats;
	}

	getProfileImage(src: string) {
		return getProfileImage(src);
	}
}
