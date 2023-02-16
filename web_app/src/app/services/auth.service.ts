import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
	CognitoUserSession,
	CookieStorage,
	ISignUpResult
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {GetUser, SetAuthSession, SetLoggedIn, SetUser} from '../state/user.actions';
import {HttpService} from './http.service';
import {UserStateModel} from '../state/user.state';
import {SetCover} from '../state/upload.actions';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	@Select((state) => state.app.user.authSession) session$: Observable<CognitoUserSession>;
	session: CognitoUserSession = undefined;

	userPool = new CognitoUserPool({
		UserPoolId: environment.UserPoolId,
		ClientId: environment.ClientId,
		Storage: new CookieStorage({secure: false, domain:"democharts.com"}),
	});

	constructor(private router: Router, private store: Store, private http: HttpService) {
		const currentUser = this.userPool.getCurrentUser();
		if (currentUser) {

			// TODO do not trigger this function in the constructor, trigger it ONCE somewhere in the app
			currentUser.getSession((err, session: CognitoUserSession) => {
				if (err) {
					console.log(err);
					this.signOut();
					return;
				}
				this.updateLoginStatus();

				this.store.dispatch(new SetAuthSession(session));
			});
		}

		this.session$.subscribe(el => {
			this.session = el;
		});
	}

	signIn(email: string, password: string, onSuccess: (user: UserStateModel) => void, onError: (err: any) => void) {
		const AD = new AuthenticationDetails({
			Username: email?.toLowerCase().trim(),
			Password: password,
		});
		const CU = new CognitoUser({
			Username: email?.toLowerCase().trim(),
			Pool: this.userPool,
			Storage: new CookieStorage({secure: false, domain: "democharts.org"})
		});

		const thisTmp = this;

		CU.authenticateUser(AD, {
			async onSuccess(result) {

				console.log('Authenticate user on success', result);

				thisTmp.store.dispatch(new SetAuthSession(result));

				thisTmp.http.getUser().subscribe((user: UserStateModel) => {
						if (user.approvedByAdmin) {
							thisTmp.store.dispatch(new SetUser(user));
							thisTmp.updateLoginStatus();
							onSuccess(user);
						} else {
							thisTmp.signOut(false);

							onError({
								code: 'not_approved_by_admin_yet',
								message: 'User is not approved by admin.'
							});
						}
					},
					(err) => {
						console.log('USER -- ERROR on fetching profile');
						onError(err);
					}
				);
			},
			onFailure(err) {
				console.error(err);
				onError(err);
			},
		});
	}

	signup(email: string, password: string): Observable<ISignUpResult> {
		return new Observable((observer) => {
			this.userPool.signUp(
				email.trim(),
				password.trim(),
				[],
				[],
				(err, result) => {
					if (err) {
						console.log(err);
						observer.error(err);
					}
					observer.next(result);
					observer.complete();
				}
			);
		});
	}

	confirmSignUp(email: string, code: string) {
		return new Observable((observer) => {
			new CognitoUser({
				Username: email.toLocaleLowerCase(),
				Pool: this.userPool,
				Storage: new CookieStorage({secure: false, domain: "democharts.org"})
			}).confirmRegistration(code, true, (err, result) => {
				if (err) {
					console.log(err);
					observer.error(err);
				}
				observer.next(result);
				observer.complete();
			});
		});
	}

	resendConfirmationCode(email: string) {
		return new Observable((observer) => {
			new CognitoUser({
				Username: email.toLocaleLowerCase(),
				Pool: this.userPool,
				Storage: new CookieStorage({secure: false, domain: "democharts.org"})
			}).resendConfirmationCode((err, result) => {
				if (err) {
					console.log(err);
					observer.error(err);
				}
				observer.next(result);
				observer.complete();
			});
		});
	}

	resetPassword(email: string) {
		return new Observable((observer) => {
			new CognitoUser({
				Username: email.toLocaleLowerCase(),
				Pool: this.userPool,
				Storage: new CookieStorage({secure: false, domain: "democharts.org"})
			}).forgotPassword({
				onSuccess: (data) => {
					observer.next(data);
					observer.complete();
				},
				onFailure: (err) => {
					console.log('ERROR', err);
					observer.error(err);
				},
			});
		});
	}

	verifyPassword(email: string, code: string, password: string) {
		return new Observable((observer) => {
			new CognitoUser({
				Username: email.toLocaleLowerCase(),
				Pool: this.userPool,
				Storage: new CookieStorage({secure: false, domain: "democharts.org"})
			}).confirmPassword(code, password, {
				onSuccess: () => {
					observer.next();
					observer.complete();
				},
				onFailure: (err) => {
					console.log(err);
					observer.error(err);
				},
			});
		});
	}

	deleteUser() {
		return new Observable((observer) => {
			const currentUser = this.userPool.getCurrentUser();

			currentUser.getSession((err, session: CognitoUserSession) => {
				if (err) {
					console.log(err);

					return;
				}
				currentUser.deleteUser((err, result) => {
					if (err) {
						console.log(err);
						observer.error(err);
					}
					this.updateLoginStatus();
					observer.next(result);
					observer.complete();
				});
			});
		});
	}

	signOut(redirect = true) {
		this.store.dispatch(new SetAuthSession(undefined));
		this.userPool.getCurrentUser().signOut();
		this.updateLoginStatus();
		this.store.dispatch(new SetUser(null));
		this.router.navigate(['/login']);
	}

	updateLoginStatus() {
		if (!!this.userPool.getCurrentUser()) {
			console.log('SET LOGGED IN: true');
			this.store.dispatch(new SetLoggedIn(true));
		} else {
			console.log('SET LOGGED IN: false');
			this.store.dispatch(new SetLoggedIn(false));
		}
	}

	// Gets the JWT token of the currently signed in user
	getAuthToken() {
		if (this.session) {
			return this.session.getIdToken().getJwtToken();
		} else {
			return '';
		}
	}

	// Auth headers for authentication with the backend
	getAuthHeader(): HttpHeaders {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.getAuthToken(),
		});
	}
}
