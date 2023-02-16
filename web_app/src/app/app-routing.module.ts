import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistGuard } from './guards/artist.guard';
import { AdminGuard } from './guards/admin.guard';
import { ExpertGuard } from './guards/expert.guard';
import { LoginGuard } from './guards/login.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { ChartsComponent } from './pages/charts/charts.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DemoplayerComponent } from './pages/demoplayer/demoplayer.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MydemosComponent } from './pages/mydemos/mydemos.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UploadComponent } from './pages/upload/upload.component';
import { VerifyComponent } from './pages/verify/verify.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';


const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [RedirectGuard],
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'verify',
		component: VerifyComponent,
	},
	{
		path: 'reset-password',
		component: ResetpasswordComponent,
	},
	{
		path: 'admin',
		canActivate: [AdminGuard],
		component: AdminComponent
	},
	{
		path: '',
		canActivate: [LoginGuard],
		children: [
			{
				path: 'upload',
				component: UploadComponent,
				canActivate: [ArtistGuard],
			},
			{
				path: 'upload/:step',
				component: UploadComponent,
				canActivate: [ArtistGuard],
			},
			{
				path: 'mydemos',
				component: MydemosComponent,
				canActivate: [ArtistGuard],
			},
			{
				path: 'demoplayer',
				component: DemoplayerComponent,
				canActivate: [ExpertGuard],
			},
			{
				path: 'favorites',
				component: FavoritesComponent,
				canActivate: [ExpertGuard],
			},
			{
				path: 'demoplayer/:songID',
				component: DemoplayerComponent,
				canActivate: [ExpertGuard],
			},
			{
				path: 'charts',
				component: ChartsComponent,
				canActivate: [ExpertGuard],
			},
			{
				path: 'profile',
				component: ProfileComponent,
			},
			{
				path: 'profile/:username',
				component: ProfileComponent,
			},
			{
				path: 'messages',
				component: MessagesComponent,
			},
			{
				path: 'settings',
				component: SettingsComponent,
			},
		],
	},
	{
		path: '**',
		redirectTo: '/login',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
