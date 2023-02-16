import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPaperPlane, faStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart, } from '@fortawesome/free-solid-svg-icons';
import {Select, Store} from '@ngxs/store';
import { EMPTY, Observable } from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserStateModel } from 'src/app/state/user.state';
import {IProfile, IProfileListItem, uploadedSong} from 'src/app/types/Profile';
import {getProfileImage, getSongImage} from "../../helpers/getPublicUrl";
import {SetNavigationTitle} from "../../state/app.actions";
import {NgEventBus} from "ng-event-bus";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;
	profile$: Observable<IProfile>;

	isFollowedByRequestedUser = false;

	faHeart = faHeart;
	faStar = faStar;
	faPaperPlane = faPaperPlane;
	playingUid = '';
	currentDemoHover: string = undefined;

	itemsPreviousReleases: IProfileListItem[];
	itemsJobAndSkills: IProfileListItem[];
	itemsReferences: IProfileListItem[];
	itemsAll: IProfileListItem[];

	firstTime = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpService,
		private toast: ToastService,
		private store: Store,
		private eventBus: NgEventBus,
	) {
		this.store.dispatch(new SetNavigationTitle('Profile'));
	}

	ngOnInit(): void {

		this.route.paramMap.subscribe((res) => {
			const username = res.get('username');

			this.firstTime = true;

			// Navigate to profile of logged in user if no username is given
			if (!username) {
				this.user$.subscribe((user) => {
					if (this.firstTime){
						this.firstTime = false;
						return this.router.navigate(['profile', user.slug])
					}
				});
			} else {
				this.retrieveProfile(username);
			}
		});

		this.user$.subscribe((user) => {
			this.eventBus.cast('navigation:onShowEditProfileButton', this.router.url === `/profile/${user.slug}`);

		});

	}

	ngOnDestroy(): void {
		this.eventBus.cast('navigation:onShowEditProfileButton', false);
	}

	retrieveProfile(username) {

		this.profile$ = this.http.getProfile(username).pipe(
			tap(el => {
				this.isFollowedByRequestedUser = el.isFollowedByRequestedUser;
				console.log("PROFILE")
				console.log(el)
				el.uploadedSongs.map(song => {
					song.coverUrl = getSongImage(song.uid);
				});

				this.itemsAll = el.profileListItems;
				this.itemsPreviousReleases = el.profileListItems.filter(el => el.title === 'type_previous_releases');
				this.itemsReferences = el.profileListItems.filter(el => el.title === 'type_artist_collaborations');
				this.itemsJobAndSkills = el.profileListItems.filter(el => el.title === 'type_job_and_skills');
				console.log("PROFILE ITEMS", el.profileListItems);
			}),
			catchError((err) => {
				console.log(err);
				if (err.status === 401) {
					this.toast.addToast('The profiles of other artists are secret.', 'error');
					this.router.navigate(['mydemos']);
				}
				if (err.status === 404) {
					this.toast.addToast(
						'This Profile does not exist',
						'error'
					);
					this.router.navigate(['mydemos']);
				}

				return EMPTY;
			})
		);
	}

	createChat() {
		// let prof;

		this.profile$
			// .pipe(switchMap((profile) => {
			// 	prof = profile;
			// 	return this.http.createChat([profile.uid]);
			// }))
			.subscribe((prof) => {
				this.router.navigate(['messages'], {queryParams: {chat: prof.slug}});
				// },
				// (err) => {
				// 	this.toast.addToast('Error creating chat', 'error');
				// }
			});
	}

	toggleSavedArtist() {
		let profile: IProfile;

		this.profile$
			.pipe(switchMap((prof) => {
				profile = prof;
				return this.http.markArtist(profile.uid, !profile.isFollowedByRequestedUser);
			}))
			.subscribe(
				(res) => {
					if (!profile.isFollowedByRequestedUser) {
						this.toast.addToast('Saved artist to your favorites.');
					} else {
						this.toast.addToast('Removed artist from your favorites.');
					}

					this.isFollowedByRequestedUser = !profile.isFollowedByRequestedUser;

					// profile.isFollowedByRequestedUser = !profile.isFollowedByRequestedUser;
					// this.profile$.subscribe((next) => {
					// 	next.isFollowedByRequestedUser = !profile.isFollowedByRequestedUser;
					// 	console.log(next);
					// });
				},
				(err) => {
					this.toast.addToast('Error saving artist', 'error');
				}
			);
	}
}
