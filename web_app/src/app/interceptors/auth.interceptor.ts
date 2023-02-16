import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Adds auth headers if the reqeust goes to the democharts backend

		if (request.url.startsWith(environment.apiPath)) {
			request = request.clone({
				headers: this.auth.getAuthHeader(),
			});
		}

		return next.handle(request);
	}
}
