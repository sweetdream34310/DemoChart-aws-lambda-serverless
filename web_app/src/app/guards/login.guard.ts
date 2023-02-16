import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs/operators';
import { GetUser } from '../state/user.actions';
import { UserStateModel } from '../state/user.state';
import {GetUnreadChats} from '../state/chat.actions';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate {
	@Select((state) => state.app.user) user$: Observable<UserStateModel>;

	constructor(private router: Router, private store: Store) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		// Checks if user is logged in
		return this.user$.pipe(
			switchMap((user) => {
				if (user.loggedIn) {
					// If user data is not already fetched, fetch it
					if (user?.uid) {
						return of(true);
					} else {
						this.store
							.dispatch(new GetUnreadChats())
							.pipe(map((_) => true));

						return this.store
							.dispatch(new GetUser())
							.pipe(map((_) => true));
					}
				} else {
					console.log('not logged in');
					return of(this.router.parseUrl('/login'));
				}
			})
		);
	}
}
