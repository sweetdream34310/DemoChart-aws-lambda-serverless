// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';

// Pages
import { RegisterComponent } from './pages/register/register.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { UploadComponent } from './pages/upload/upload.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

// Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { WaveformComponent } from './components/waveform/waveform.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ContactsComponent } from './components/chat/contacts/contacts.component';
import { DetailsComponent } from './components/chat/details/details.component';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { ModalComponent } from './components/modal/modal.component';
import { CropComponent } from './modals/crop/crop.component';
import { Step1Component } from './pages/upload/step1/step1.component';
import { Step2Component } from './pages/upload/step2/step2.component';
import { Step3Component } from './pages/upload/step3/step3.component';
import { Step4Component } from './pages/upload/step4/step4.component';
import { Step5Component } from './pages/upload/step5/step5.component';
import { DemoplayerComponent } from './pages/demoplayer/demoplayer.component';
import { MydemosComponent } from './pages/mydemos/mydemos.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';

// State
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from './state/app.state';
import { ChatState } from './state/chat.state';
import { FollowedState } from './state/followed.state';
import { UserState } from './state/user.state';
import { UploadState } from './state/upload.state';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RetryInterceptor } from './interceptors/retry.interceptor';

// Pipes
import { LabelSearchPipe } from './pipes/label-search.pipe';
import { IsMePipe } from './pipes/is-me.pipe';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { LimitNgForPipe } from './pipes/limit-ng-for.pipe';
import { RatingPipe } from './pipes/rating.pipe';

import { environment } from 'src/environments/environment';
import {
	ModalTitleDirective,
	ModalActionsDirective,
	ModalCloseDirective,
	ModalContentDirective,
} from './directives/modal.directive';
import { RemainingTimePipe } from './pipes/remaining-time.pipe';
import { CropHeaderComponent } from './modals/cropHeader/cropHeader.component';
import { FollowedUserComponent } from './components/followed-user/followed-user.component';
import { UniversalModalComponent } from './components/universal-modal/universal-modal.component';
import { MobileNavigationComponent } from './components/mobile-navigation/mobile-navigation.component';
import { AdminComponent } from './pages/admin/admin.component';
import { IconSettingsComponent } from './icons/icon-settings/icon-settings.component';
import { CrocsComponent } from './icons/crocs/crocs.component';
import { UploadedSincePipe } from './pipes/uploaded-since.pipe';
import { PageLoadingAnimationComponent } from './components/page-loading-animation/page-loading-animation.component';

import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { DemoComponent } from './components/demo/demo.component';
import { UploadDemoComponent } from './components/upload-demo/upload-demo.component';
import { MydemoBoxComponent } from './components/mydemo-box/mydemo-box.component';
import { IconCloseComponent } from './icons/icon-close/icon-close.component';
import { IconFlagComponent } from './icons/icon-flag/icon-flag.component';
import { IconChatComponent } from './icons/icon-chat/icon-chat.component';
import { IconHeartComponent } from './icons/icon-heart/icon-heart.component';
import { IconPlayComponent } from './icons/icon-play/icon-play.component';
import { IconEmailComponent } from './icons/icon-email/icon-email.component';
import { NgEventBus } from 'ng-event-bus';
import { DropdownListComponent } from './components/dropdown-list/dropdown-list.component';
import { IconMoreOptionsComponent } from './icons/icon-more-options/icon-more-options.component';
import { IconPauseComponent } from './icons/icon-pause/icon-pause.component';
import { IconStarComponent } from './icons/icon-star/icon-star.component';
import { IconNextComponent } from './icons/icon-next/icon-next.component';
import { IconFilterComponent } from './icons/icon-filter/icon-filter.component';
import { IconProfileComponent } from './icons/icon-profile/icon-profile.component';
import { IconVinylComponent } from './icons/icon-vinyl/icon-vinyl.component';
import { IconUploadComponent } from './icons/icon-upload/icon-upload.component';
import { EasyModalComponent } from './components/easy-modal/easy-modal.component';
import { ImageGiftComponent } from './icons/image-gift/image-gift.component';
import { ProfileSongComponent } from './components/profile-song/profile-song.component';
import { ProfileDemosComponent } from './components/profile-demos/profile-demos.component';
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { ProfileDefaultItemsComponent } from './components/profile-default-items/profile-default-items.component';
import { ProfileItemsEditComponent } from './components/profile-items-edit/profile-items-edit.component';
import { DemosharkInformationComponent } from './components/demoshark-information/demoshark-information.component';
import { IconStarOutlinedComponent } from './icons/icon-star-outlined/icon-star-outlined.component';

// import { LottieModule } from 'ngx-lottie';
// import player from 'lottie-web';


// export function playerFactory() {
// 	return player;
// }

@NgModule({
	imports: [
		// LottieModule.forRoot({ player: playerFactory }),
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		PortalModule,
		OverlayModule,
		BrowserAnimationsModule,
		CdkStepperModule,
		ImageCropperModule,
		NgxDropzoneModule,
		ServiceWorkerModule.register('ngsw-worker.js'),
		NgxsModule.forRoot([AppState, ChatState, UserState, UploadState, FollowedState], {
			developmentMode: !environment.production,
		}),
		NgxsReduxDevtoolsPluginModule.forRoot({
			disabled: environment.production,
		}),
		// NgxsLoggerPluginModule.forRoot({
		// 	disabled: environment.production,
		// }),
		FontAwesomeModule,
		NgCircleProgressModule.forRoot()
	],
	declarations: [
		AppComponent,
		LoginComponent,
		WaveformComponent,
		SpinnerComponent,
		SelectComponent,
		UploadComponent,
		ButtonComponent,
		RegisterComponent,
		VerifyComponent,
		ResetpasswordComponent,
		FooterComponent,
		HeaderComponent,
		FormFieldComponent,
		ToastsComponent,
		ProfileComponent,
		MessagesComponent,
		StepperComponent,
		SettingsComponent,
		ContactsComponent,
		DetailsComponent,
		ChatWindowComponent,
		ModalComponent,
		CropComponent,
		CropHeaderComponent,
		ModalTitleDirective,
		ModalActionsDirective,
		ModalContentDirective,
		ModalCloseDirective,
		Step1Component,
		Step2Component,
		Step3Component,
		Step4Component,
		Step5Component,
		MydemosComponent,
		LabelSearchPipe,
		DemoplayerComponent,
		ChartsComponent,
		TimeDiffPipe,
		LimitNgForPipe,
		IsMePipe,
		RatingPipe,
		RemainingTimePipe,
		LogoutModalComponent,
		YesNoModalComponent,
		FavoritesComponent,
		FollowedUserComponent,
		UniversalModalComponent,
		MobileNavigationComponent,
		AdminComponent,
		IconSettingsComponent,
		CrocsComponent,
		UploadedSincePipe,
		PageLoadingAnimationComponent,
		LoadingAnimationComponent,
		DemoComponent,
		UploadDemoComponent,
		MydemoBoxComponent,
		IconCloseComponent,
		IconFlagComponent,
		IconChatComponent,
		IconHeartComponent,
		IconPlayComponent,
		IconEmailComponent,
		DropdownListComponent,
		IconMoreOptionsComponent,
		IconPauseComponent,
		IconStarComponent,
		IconNextComponent,
		IconFilterComponent,
		IconProfileComponent,
		IconVinylComponent,
		IconUploadComponent,
		EasyModalComponent,
		ImageGiftComponent,
		ProfileSongComponent,
		ProfileDemosComponent,
		ProfileAboutComponent,
		ProfileDefaultItemsComponent,
		ProfileItemsEditComponent,
		DemosharkInformationComponent,
		IconStarOutlinedComponent
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: RetryInterceptor,
		// 	multi: true,
		// },
		NgEventBus,
	],
	bootstrap: [AppComponent],
	entryComponents: [ModalComponent],
})
export class AppModule {}
