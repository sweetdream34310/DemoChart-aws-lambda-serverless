import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
	constructor(private router: Router, private auth: AuthService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const user = this.auth.userPool.getCurrentUser();
		if (user) {
			console.log('already logged in');
			return this.router.parseUrl('/profile');
		} else {
			return true;
		}
	}
}
