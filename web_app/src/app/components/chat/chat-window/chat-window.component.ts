import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ViewChild,
	AfterViewChecked,
	QueryList,
	ViewChildren,
} from '@angular/core';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
import {ChatDto, ChatMessage} from '../../../../../../lib/dto/Chat.dto';

import {getProfileImage} from '../../../helpers/getPublicUrl';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {UserStateModel} from '../../../state/user.state';
import {Router} from '@angular/router';
import {AddChatContacts} from "../../../state/chat.actions";

@Component({
	selector: 'app-chat-window',
	templateUrl: './chat-window.component.html',
	styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	@Input() selectedChat: ChatDto;
	@Input() inChat = false;
	@Output() inChatChange: EventEmitter<boolean> = new EventEmitter();
	@ViewChild('scroll') scroll: ElementRef;
	@ViewChildren('messages') messages: QueryList<any>;

	message = '';
	faBackward = faBackward;

	constructor(
		private chat: ChatService,
		private router: Router,
		private store: Store,
	) {}

	ngAfterViewChecked(): void {
		this.scrollToBottom();
	}

	ngOnInit(): void {}

	scrollToBottom = () => {
		if (this.scroll) {
			this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
		}
	}

	back() {
		this.inChatChange.emit(false);
	}

	send() {
		this.chat.sendMessage(this.message, this.selectedChat.uid, this.selectedChat.member.uid);

		// new chat
		if (!this.selectedChat.uid) {
			this.store.dispatch(new AddChatContacts(this.selectedChat));
		}

		this.message = '';
	}


	goToProfile(uid) {
		if (uid === this.selectedChat.member.uid) {
			this.router.navigate(['profile', this.selectedChat.member.slug]);
		}
	}
	foreignProfileImage(src: string) {
		return getProfileImage(src);
	}


	get ownProfileImgSrc(): Observable<string> {
		return this.user$.pipe(map((e) => {
			return getProfileImage(e.profileImageSrc);
		}));
	}
}
