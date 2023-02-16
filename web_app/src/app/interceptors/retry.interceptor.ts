import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService) {}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// Retries the request 1 more time if it fails
		return next.handle(request).pipe(
			retry(1),
			catchError((error: HttpErrorResponse) => throwError(error))
		);
	}
}
