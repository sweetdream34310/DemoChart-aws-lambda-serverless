import {Component, Input, OnInit} from '@angular/core';
import {IFollowed} from '../../types/Followed';
import {getProfileImage} from '../../helpers/getPublicUrl';
import { faPaperPlane, faHeart } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {ToastService} from '../../services/toast.service';
import {Select, Store} from '@ngxs/store';
import {GetFollowed, MarkFollowed} from '../../state/followed.actions';
import {Observable} from 'rxjs';
import {IKeyValue} from '../../types/KeyValue';

@Component({
	selector: 'app-followed-user',
	templateUrl: './followed-user.component.html',
	styleUrls: ['./followed-user.component.scss']
})
export class FollowedUserComponent implements OnInit {

	@Select((state) => state.app.countries) countries$: Observable<IKeyValue[]>;

	@Input() followed: IFollowed;

	faHeart = faHeart;
	faPaperPlane = faPaperPlane;

	country = '-';

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpService,
		private toast: ToastService,
		private store: Store,
	) {
	}

	ngOnInit(): void {

		this.countries$.subscribe((countries) => {
			const countr = countries.find(country => country[0].toString() === this.followed.followed.countryID.toString());
			this.country = countr[1];
		});
	}

	getProfileImage(src: string) {
		return getProfileImage(src);
	}

	goToChat(event: MouseEvent) {
		event.stopPropagation();

		this.router.navigate(['messages'], {queryParams: {chat: this.followed.followed.slug}});

		// this.http.createChat([this.followed.followed.uid])
		// 	.subscribe(
		// 		(res) => {
		// 			this.router.navigate(['messages']);
		// 		},
		// 		(err) => {
		// 			this.toast.addToast('Error creating chat', 'error');
		// 		}
		// 	);
	}

	unmarkArtist(event: MouseEvent) {
		event.stopPropagation();

		const thisTmp = this;
		function cb(succeeded: boolean, uid: string, added: boolean): void {
			if (succeeded) {
				if (!added) {
					thisTmp.toast.addToast('Artist removed from list.');
					thisTmp.store.dispatch(new GetFollowed());
				}
			}
		}

		this.store.dispatch(new MarkFollowed(this.followed.followed.uid, false, cb));
	}

}
