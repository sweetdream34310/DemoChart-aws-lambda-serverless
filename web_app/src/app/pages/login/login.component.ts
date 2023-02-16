import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import {DOCUMENT} from '@angular/common';
import {GetUnreadChats} from '../../state/chat.actions';
import {map} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {UserStateModel} from '../../state/user.state';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	signIn = this.fb.group({
		email: [environment.email, [Validators.required, Validators.email]],
		password: [environment.password, Validators.required],
	});

	loading = false;
	messageCode = undefined;

	showResendEmail = false;

	constructor(
		private auth: AuthService,
		private fb: FormBuilder,
		private router: Router,
		private store: Store,
		private toast: ToastService,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit(): void {
		// this.document.body.classList.add('colorful');
	}

	ngOnDestroy(): void {
		// this.document.body.classList.remove('colorful');
	}

	resendEmail(): void {
		const { email } = this.signIn.value;
		this.auth.resendConfirmationCode(email).subscribe((res) => {
				this.toast.addToast('Check your mail!');
			},
			(err) => {
				this.toast.addToast('An error occured, please reach out to the support.', 'error');
			}
		);
	}

	async onSubmit() {
		this.loading = true;
		const { email, password } = this.signIn.value;

		const onSuccess = (user: UserStateModel) => {
			this.loading = false;

			this.store.dispatch(new GetUnreadChats())
				.pipe(map((_) => true));


			if (user.userType === 1) {
				this.router.navigate(['/mydemos']);
			} else {
				this.router.navigate(['/demoplayer']);
			}
		};

		const onError = (err) => {
			this.loading = false;

			if (err.code === 'UserNotConfirmedException'){
				this.showResendEmail = true;
				this.toast.addToast(
					`It seems that you haven't confirmed your e-mail yet.`,
					'error'
				);
			} else if (err.code === 'NotAuthorizedException') {
				this.toast.addToast(
					`Incorrect password or username`,
					'error'
				);
			} else if (err.code === 'not_approved_by_admin_yet' ) {
				this.messageCode = 'not_approved_yet';
			}
		};

		this.auth.signIn(email, password, onSuccess, onError);
	}
}
