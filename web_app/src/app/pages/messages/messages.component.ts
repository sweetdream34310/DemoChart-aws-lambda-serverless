import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Select, Store } from '@ngxs/store';
import { ChatDto } from '../../../../../lib/dto/Chat.dto';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';
import {GetChats, GetUnreadChats, LocalMarkChatAsRead} from '../../state/chat.actions';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ChatStateModel} from '../../state/chat.state';
import {UserStateModel} from '../../state/user.state';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
	chats$: Observable<ChatDto[]>;
	user: UserStateModel;

	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	inChat = false;
	inDetails = false;
	isActive = false;
	noContacts = false;
	contactsLoaded = false;
	chatSlug = undefined;

	selectedChat: ChatDto = undefined;

	constructor(private store: Store, private router: Router, private route: ActivatedRoute, private http: HttpService) {
	}

	ngOnInit(): void {
		this.isActive = true;


		this.store.dispatch(new GetChats());

		this.user$.subscribe(el => {
			this.user = el;
		});

		this.store
			.select((state) => state.app.chat)
			.subscribe((chatStore: ChatStateModel) => {
				console.log(chatStore);
				this.contactsLoaded = chatStore.chatInitialLoaded;
				this.noContacts = chatStore.chatInitialLoaded && chatStore.chats.length === 0;
			});

		this.chats$ = this.store
			.select((state) => state.app.chat.chats)
			.pipe(
				tap((chats: ChatDto[]) => {

					if (!this.isActive) { return; }

					this.chatSlug = this.route.snapshot.queryParams.chat;

					if (!this.chatSlug) {
						if (chats.length === 0) { return; }

						if (!this.selectedChat) {
							this.selectExistingChat(chats[0]);
						} else {
							const selectedChat = chats.find(el => this.selectedChat.uid === el.uid);
							this.selectExistingChat(selectedChat);
						}
					} else {
						const foundChatInLocal = chats.find(el => el.member.slug === this.chatSlug);

						if (!foundChatInLocal) {
							this.startNewChat(this.chatSlug);
						} else {
							this.selectExistingChat(foundChatInLocal);
						}
					}
				})
			);
	}

	ngOnDestroy(): void {
		this.isActive = false;
	}

	startNewChat(slug) {
		this.http
			.getProfile(slug)
			.subscribe((prof) => {
				this.selectedChat = {
					uid: undefined,
					member: {
						artistName: prof.artistName,
						slug: prof.slug,
						uid: prof.uid,
						lastName: prof.lastName,
						firstName: prof.firstName,
						profileImage: prof.profileImageSrc,
						company: '',
						userType: prof.userType,
					},
					messages: []
				};
			});
	}

	selectExistingChat(chatToSelect) {
		// if (this.selectedChat && this.selectedChat.uid === chatToSelect.uid) {
		// TODO Refactor! at the moment, this will prevent the chat window to refresh incoming messages...
		// 	return;
		// }

		this.selectedChat = chatToSelect;
		this.http.markChatAsRead(chatToSelect.uid).subscribe();
		this.store.dispatch(new LocalMarkChatAsRead(chatToSelect.uid));
	}


	selectChat(chat: ChatDto) {
		this.selectedChat = chat;

		this.http.markChatAsRead(chat.uid).subscribe();
		this.store.dispatch(new LocalMarkChatAsRead(chat.uid));
	}

	back() {
		this.inChat = false;
	}

	goToDemoplayer() {
		this.router.navigate(['demoplayer']);
	}

	goToSongUpload() {
		this.router.navigate(['upload']);
	}
}
