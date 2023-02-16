import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { UserDto } from '../../../../lib/dto/User.dto';
import { UserTypes } from '../../../../lib/types/UserTypes';

@Injectable({
	providedIn: 'root',
})
export class ArtistGuard implements CanActivate {
	@Select((state) => state.app.user) user$: Observable<UserDto>;

	constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.user$.pipe(
			map((e) => {
				if (e.userType === UserTypes.Artist) {
					return true;
				} else {
					console.log('not an artist');
					return this.router.parseUrl('/profile');
				}
			})
		);
	}
}
