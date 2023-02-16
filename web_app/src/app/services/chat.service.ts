import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import {AddMessage, GetUnreadChats} from '../state/chat.actions';
import {map} from "rxjs/operators";

@Injectable({
	providedIn: 'root',
})
export class ChatService {
	private connection: WebSocketSubject<any>;

	constructor(private auth: AuthService, private store: Store) {}

	connect() {

		console.log("ws connect...");
		this.connection = webSocket({
			url: `${
				environment.websocketPath
			}?Authorizer=${this.auth.getAuthToken()}`,
		});

		this.connection.subscribe(
			(msg) => {
				this.store.dispatch(new AddMessage(msg));

				this.store
					.dispatch(new GetUnreadChats())
					.pipe(map((_) => true));
			},
			(err) => console.error('websocket error:', err),
			() => console.log('websocket complete')
		);
	}

	disconnect() {
		console.log('ws disconnect (TODO)');
	}

	createChat() {}

	sendMessage(message: string, chatID: string, recipientUid: string) {
		if (message && (chatID || recipientUid)) {
			console.log("sendMessage");
			this.connection.next({
				action: 'send',
				chatID,
				message,
				recipientUid,
			});
		}
	}
}
