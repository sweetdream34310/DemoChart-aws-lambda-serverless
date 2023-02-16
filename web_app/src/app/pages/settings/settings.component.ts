import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	first,
	map,
	switchMap
} from 'rxjs/operators';
import { CropComponent } from 'src/app/modals/crop/crop.component';
import { CropHeaderComponent } from 'src/app/modals/cropHeader/cropHeader.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { GetUser } from 'src/app/state/user.actions';
import { UserStateModel } from 'src/app/state/user.state';
import { IKeyValue } from 'src/app/types/KeyValue';
import { IProfileListItem } from 'src/app/types/Profile';
import { ISocialMedia } from 'src/app/types/UpdateProfile';
import { ModalService } from '../../services/modal.service';
import {
	compressImage,
	PROFILE_HEADER_HEIGHT,
	PROFILE_HEADER_WIDTH,
	PROFILE_PIC_SIZE
} from '../../helpers/compressBase64Images';
import {INDUSTRIES} from '../../../../../lib/types/Industries';
import {GENRES} from '../../../../../lib/types/Genres';
import {UserTypes} from '../../../../../lib/types/UserTypes';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
	@Select((state) => state.app.countries) countries$: Observable<IKeyValue[]>;
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	platforms: IKeyValue[] = [
		[1, 'facebook'],
		[2, 'instagram'],
		[3, 'soundcloud'],
		[4, 'spotify'],
		[5, 'website'],
	];

	profile = this.fb.group({

		firstName: [
			,
			[Validators.required, Validators.maxLength(35)],
		],

		lastName: [
			,
			[Validators.required, Validators.maxLength(35)],
		],

		artistName: [
			,
			[Validators.maxLength(35)],
		],
		bio: [, [Validators.maxLength(400)]],
		jobTitle: [],
		genreID: [],
		countryID: [, [Validators.required]],
	});

	addSocialMedia = this.fb.group({
		platform: [, [Validators.required]],
		link: [, [Validators.required]],
		linkText: [, [Validators.required]],
	});

	profileListItems: IProfileListItem[] = [];

	itemsJobAndSkills: IProfileListItem[] = [];
	itemsPreviousReleases: IProfileListItem[] = [];
	itemsReferences: IProfileListItem[] = [];

	faTrash = faTrash;

	socialMedias: ISocialMedia[] = [];
	loading = false;
	uploadingProfile = false;
	uploadingHeader = false;
	submitted = false;
	socialSubmitted = false;
	referencsSubmitted = false;

	genreOptions = GENRES.map(el => [el.id, el.name]);
	jobTitleOptions = INDUSTRIES.map(el => [el.id, el.name]);

	constructor(
		private http: HttpService,
		private modal: ModalService,
		private toast: ToastService,
		private store: Store,
		private auth: AuthService,
		private router: Router,
		private fb: FormBuilder,
	) {}

	ngAfterViewInit(): void {
		// For some reason this is needed
		this.firstName.updateValueAndValidity();
		this.lastName.updateValueAndValidity();
		this.artistName.updateValueAndValidity();
	}

	ngOnInit(): void {
		this.user$
			.pipe(
				switchMap((e) => {
					console.log("REFETCH USER");
					return this.http.getProfile(e.slug);
				})
			)
			.subscribe((res) => {

				const jobTitleObj = this.jobTitleOptions.find(el => el[1] === res.jobTitle);
				const genreID = this.genreOptions.find(el => el[1] === res.genreID);

				this.profile.patchValue({
					firstName: res.firstName,
					lastName: res.lastName,
					artistName: res.artistName ? res.artistName : '',
					bio: res.bio,
					jobTitle: jobTitleObj && jobTitleObj[0],
					genreID: genreID && genreID[0],
					countryID: res.countryID,
				});

				this.socialMedias = res.socialMedias;

				this.profileListItems = res.profileListItems;

				this.itemsPreviousReleases = this.profileListItems.filter(el => el.title === 'type_previous_releases');
				this.itemsReferences = this.profileListItems.filter(el => el.title === 'type_artist_collaborations');
				this.itemsJobAndSkills = this.profileListItems.filter(el => el.title === 'type_job_and_skills');
			});
	}

	async uploadProfilePic() {
		const ref = this.modal.open(CropComponent, null);
		ref.afterClosed$.subscribe(async (res) => {
			if (res.data) {
				this.uploadingProfile = true;
				const compressedImage = await compressImage(res.data, PROFILE_PIC_SIZE, PROFILE_PIC_SIZE);
				this.http.uploadProfilePic(compressedImage).subscribe(
					() => {
						this.uploadingProfile = false;

						this.store.dispatch(new GetUser());
						// window.location.reload();
						this.toast.addToast(
							'Profile picture successfully updated',
							'success'
						);
					},
					(err) => {
						this.uploadingProfile = false;
						console.log(err);
						this.toast.addToast(
							'Error during profile picture uploading',
							'error'
						);
					}
				);
			}
		});
	}

	async uploadProfileHeader() {
		const ref = this.modal.open(CropHeaderComponent, null);
		ref.afterClosed$.subscribe(async (res) => {
			if (res.data) {
				this.uploadingHeader = true;
				const compressedImage = await compressImage(res.data, PROFILE_HEADER_WIDTH, PROFILE_HEADER_HEIGHT);
				this.http.uploadProfileHeader(compressedImage).subscribe(
					(res) => {
						this.uploadingHeader = false;
						console.log(res);
						this.toast.addToast(
							'Profile header successfully updated',
							'success'
						);
					},
					(err) => {
						this.uploadingHeader = false;
						console.log(err);
						this.toast.addToast(
							'Error during profile header uploading',
							'error'
						);
					}
				);
			}
		});
	}

	addItem(item) {
		console.log("ADDED ITEM", item)
		this.profileListItems.push(item);
		this.updateProfile();
	}

	removeItem(item: IProfileListItem) {
		const index = this.profileListItems.indexOf(item);
		if (index >= 0) {
			this.profileListItems.splice(index, 1);
		}
		this.updateProfile();
	}

	updateProfile() {
		console.log("UPDATE PROFILE")
		this.submitted = true;

		// const controls = this.profile.controls;
		// console.log(controls)

		console.log(this.profile);

		if (this.profile.valid) {
			this.loading = true;

			const profileValues = {...this.profile.value};
			const jobTitleOptions = this.jobTitleOptions.find(el => el[0] === profileValues.jobTitle);
			profileValues.jobTitle = jobTitleOptions && jobTitleOptions[1];

			const body = {
				...profileValues,
				profileListItems: this.profileListItems,
				socialMedias: this.socialMedias,
			};

			console.log("UPDATE PROFILE NOW", body);

			this.http.updateProfile(body).subscribe(
				(res) => {
					this.loading = false;
					this.store.dispatch(new GetUser());
					this.toast.addToast(
						'Profile successfully updated',
						'success'
					);
				},
				(err) => {
					this.loading = false;
					console.log(err);
					this.toast.addToast('Error during updating', 'error');
				}
			);
		}
	}

	validateName(): AsyncValidatorFn {
		return (control) =>
			control.valueChanges.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				switchMap((value: string) => this.http.validateName(value)),
				map((success) => {
					return success.success ? null : { nameValid: true };
				}),
				first()
			);
	}

	closeAccount() {
		if (confirm('Are you sure? This is irreversible!')) {
			this.auth.deleteUser().subscribe(
				(res) => {
					console.log('account deleted!');
					this.router.navigate(['login']);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	addSocial() {
		this.socialSubmitted = true;
		if (this.addSocialMedia.valid) {
			const value = this.addSocialMedia.value;

			this.socialMedias.push({
				link: value.link,
				linkText: value.linkText,
				platform: this.platforms.find(
					(e) => e[0] === value.platform
				)[1],
			});
			this.updateProfile();
		}
	}

	deleteSocial(item: ISocialMedia) {
		const index = this.socialMedias.indexOf(item);
		console.log(index);
		if (index >= 0) {
			this.socialMedias.splice(index, 1);
			this.updateProfile();
		}
	}

	get firstName() {
		return this.profile.get('firstName');
	}

	get lastName() {
		return this.profile.get('lastName');
	}

	get artistName() {
		return this.profile.get('artistName');
	}

	get isArtist(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Artist));
	}

	get isExpert(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Expert));
	}
}
