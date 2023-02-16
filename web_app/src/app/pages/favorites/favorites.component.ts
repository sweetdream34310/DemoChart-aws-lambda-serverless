import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {IFollowed} from "../../types/Followed";
import {Select, Store} from "@ngxs/store";
import {GetFollowed} from "../../state/followed.actions";
import {Observable, of} from "rxjs";
import {SetNavigationTitle} from "../../state/app.actions";

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
	@Select((state) => state.app.followed.followedUsers)
	followedUsers$: Observable<IFollowed[]>;

	@Select((state) => state.app.followed.loaded)
	loaded: Observable<boolean>;

	constructor(
		private http: HttpService,
		private store: Store
	) {
		this.store.dispatch(new GetFollowed());
		this.store.dispatch(new SetNavigationTitle('Saved'));


		// this.followedUsers$ = this.store
		// 	.select((state) => state.app.chat.chats)
		// 	.pipe(
		// 		tap((e: IFollowed[]) => {
		// 			console.log("TAPPING");
		// 			console.log(e);
		// 			// if (e.length > 0) {
		// 			// 	this.chat.connect(e[0].uid);
		// 			// 	this.selectedChat = e[0];
		// 			// }
		// 		})
		// 	);
		// this.store
		// 	.select((state) => state.app.followed.followedUsers)
		// 	.subscribe((position) => {
		// 			this.followedUsers$ = position;
		// 	});
	}

	ngOnInit(): void {



		// console.log("GET FAVS:");

		// this.http.initDB().subscribe((res) => {
		// 	console.log(res);
		// });


		// this.http.getSavedArtists().subscribe((res) => {
		// 	console.log(res);
		// });
	}
}
