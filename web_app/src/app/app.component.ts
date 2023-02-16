import { OnInit } from '@angular/core';
import { ApplicationRef, Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {Select, Store} from '@ngxs/store';
import {interval, Observable, of} from 'rxjs';
import {first, tap, switchMap, map, filter} from 'rxjs/operators';
import { InitApp } from './state/app.actions';
import {GetUnreadChats} from './state/chat.actions';
import {UserTypes} from '../../../lib/types/UserTypes';
import {UserStateModel} from './state/user.state';
import {GetUser} from './state/user.actions';
import {ChatService} from "./services/chat.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	isLogged = false;

	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	constructor(
		private update: SwUpdate,
		private appRef: ApplicationRef,
		private store: Store,
		private chat: ChatService
	) {
		this.updateClient();
		this.checkUpdate();

		// appRef.isStable
		// 	.pipe(
		// 		filter((stable) => stable)
		// 	)
		// 	.subscribe(() => {
		// 		this.store.dispatch(new InitApp());
		// 	});


	}

	ngOnInit(): void {
		// setInterval(() => {
		// 	if (this.isLogged) {
		// 	}
		// }, 10000);


		this.store.dispatch(new InitApp());

		this.user$.subscribe((data) => {
			if (data.loggedIn) {
				console.log("LOGGED IN YES")
				this.chat.connect();
			} else {
				this.chat.disconnect();
			}
			this.isLogged = data.loggedIn;
		} );
	}

// Check for updates once at page load
	updateClient() {
		if (!this.update.isEnabled) {
			console.log('Not Enabled');
			return;
		}

		this.update.available.subscribe((event) => {
			console.log(
				`current`,
				event.current,
				`available `,
				event.available
			);

			if (confirm('update available for the app please conform')) {
				this.update.activateUpdate().then(() => location.reload());
			}
		});

		this.update.activated.subscribe((event) => {
			console.log(`current`, event.previous, `available `, event.current);
		});
	}

// Continuously check for updates once the app has stabilized
	checkUpdate() {
		this.appRef.isStable.subscribe((isStable) => {
			if (isStable) {
				const timeInterval = interval(5 * 60 * 1000);

				timeInterval.subscribe(() => {
					this.update
						.checkForUpdate()
						.then(() => console.log('checked'));
					console.log('update checked');
				});
			}
		});
	}

}
