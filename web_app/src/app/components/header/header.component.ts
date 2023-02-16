import {
	Component, ElementRef,
	OnInit, Renderer2,
	TemplateRef, ViewChild,
	ViewChildren,
	ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { TemplatePortal } from '@angular/cdk/portal';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { UserStateModel } from 'src/app/state/user.state';
import { map } from 'rxjs/operators';
import { UserTypes } from '../../../../../lib/types/UserTypes';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../services/modal.service';
import { LogoutModalComponent } from 'src/app/components/logout-modal/logout-modal.component';
import {getProfileImage} from '../../helpers/getPublicUrl';
import {UniversalModalComponent} from "../universal-modal/universal-modal.component";
import {ChatStateModel} from "../../state/chat.state";
import {UnreadChatDto} from "../../../../../lib/dto/Chat.dto";
import {NavigationEnd, Router} from "@angular/router";
import {DeviceDimensionsService} from "../../services/device-dimensions.service";
import {NgEventBus} from "ng-event-bus";

@UntilDestroy()
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;
	@Select((state) => state.app.chat.unreadChats) unreadChats$: Observable<UnreadChatDto[]>;
	@Select((state) => state.app.userImageHotReload) userImageHotReloadToken$: Observable<boolean>;
	@Select((state) => state.app.appState.navigation.title) navigationTitle: Observable<string>;
	@ViewChild('profilePopup') profilePopup: ElementRef;
	@ViewChild('profileImage') profileImage: ElementRef;

	currentScreen = 'undefined';

	showEditProfile = false;

	private overlayRef: OverlayRef;
	faCog = faCog;
	faSignOutAlt = faSignOutAlt;

	unreadChatsCounted = -1;


	public isProfilePopupActive: boolean;


	constructor(
		private auth: AuthService,
		private vcr: ViewContainerRef,
		private overlay: Overlay,
		private modal: ModalService,
		private renderer: Renderer2,
		public router: Router,
		private deviceDimensions: DeviceDimensionsService,
		public eventBus: NgEventBus,
	) {
		this.renderer.listen('window', 'click', (e: Event) => {
			if ((this.profilePopup && e.target !== this.profilePopup.nativeElement) && e.target !== this.profileImage.nativeElement){
				this.closeProfilePopup();
			}
		});

		this.eventBus.on('navigation:onShowEditProfileButton').subscribe((metaData) => {
			console.log("SHOW EDIT PROFILE BUTTON", metaData.data);
			this.showEditProfile = metaData.data;
		});
	}

	ngOnInit(): void {
		// Prints observable:
		// console.log(this.user$.pipe(map((e) => e.name)))
		// Prints value:
		// this.user$.subscribe(res => console.log(res));

		this.unreadChats$.subscribe(el => {
			this.unreadChatsCounted = el.length;
		});

		// this.deviceDimensions.currentScreen$.subscribe(el => {
		// 	console.log("OBST", el);
		// 	this.currentScreen = el;
		// });
	}

	signOut() {
		const ref = this.modal.open(LogoutModalComponent, null);
		ref.afterClosed$.subscribe((res) => {
			if (res.data) {
				this.close();
				this.auth.signOut();
			}
		});
	}

	openProfilePopup() {
		this.isProfilePopupActive = true;
	}
	closeProfilePopup() {
		this.isProfilePopupActive = false;
	}

	open(origin: HTMLElement, dropdown: TemplateRef<any>) {
		this.overlayRef = this.overlay.create({
			scrollStrategy: this.overlay.scrollStrategies.reposition(),
			width: origin.clientWidth,
			hasBackdrop: true,
			backdropClass: 'cdk-overlay-transparent-backdrop',
			positionStrategy: this.overlay
				.position()
				.flexibleConnectedTo(origin)
				// .withDefaultOffsetX(-150)
				.withPositions([
					{
						originX: 'end',
						originY: 'bottom',
						overlayX: 'end',
						overlayY: 'top',
					},
				]),
		});
		const dropdownPortal = new TemplatePortal(dropdown, this.vcr);
		this.overlayRef.attach(dropdownPortal);

		this.overlayRef
			.backdropClick()
			.pipe(untilDestroyed(this))
			.subscribe(() => this.close());
	}

	close() {
		this.overlayRef?.dispose();
	}

	get isArtist(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Artist));
	}

	get isExpert(): Observable<boolean> {
		return this.user$.pipe(map((e) => e.userType === UserTypes.Expert));
	}

	get profileImgSrc(): Observable<string> {
		return this.user$.pipe(map((e) => {
			return getProfileImage(e.profileImageSrc);
		}));
	}



	referToFriend() {
		const ref = this.modal.open(UniversalModalComponent, {
			title: 'Tell your friend.',
			customInput: {
				type: 'email',
				placeholder: 'Your friend\'s email address',
				value: '',
				messageValue: 'Want to join the most exclusive music network in the world? Democharts has an opening.'
			},
			feedbackSuccess: 'Alright, your friend will be contacted soon.',
			dropdownOptions: [
				'I agree that I have permission to invite this person via E-Mail',
			],
			systemInformation: `-`,
			systemTitle: 'ReferToFriend',
		});
		ref.afterClosed$.subscribe((res) => {
			if (res.data) {
				// this.close();
				// this.auth.signOut();
			}
		});
	}

	sendFeedback() {
		const ref = this.modal.open(UniversalModalComponent, {
			title: 'Send us your Feedback, and tell us what\'s up.',
			dropdownOptions: [
				'Absolutely, amazing platform. I <3 Democharts',
				'I have a great Idea that would improve the website',
				'I want to report a bug or complaint',
				'Other'
			],
			feedbackSuccess: 'Thanks for your feedback!',
			systemInformation: `-`,
			systemTitle: 'Feedback',
		});
		ref.afterClosed$.subscribe((res) => {
			if (res.data) {
				// this.close();
				// this.auth.signOut();
			}
		});
	}

	sendSupport() {
		const ref = this.modal.open(UniversalModalComponent, {
			title: 'Support\nHow can we help?',
			dropdownOptions: [
				'I want to report a bug or technical issue',
				'I\'m having problems with my Democharts account.',
				'Other'
			],
			feedbackSuccess: 'Thanks for your message, you will hear from us soon!',
			systemInformation: `-`,
			systemTitle: 'BugReport',
		});
		ref.afterClosed$.subscribe((res) => {
			if (res.data) {
				// this.close();
				// this.auth.signOut();
			}
		});
	}

	get getCurrentScreen() {
		return this.deviceDimensions.getCurrentScreen();
	}
}
