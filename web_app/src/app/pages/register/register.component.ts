import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	register = this.fb.group({
		email: [, [Validators.email]],
		passwords: this.fb.group(
			{
				password: [
					,
					[
						Validators.required,
						Validators.pattern(
							'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'
						),
					],
				],
				retypePassword: [
					,
					[Validators.required, Validators.minLength(6)],
				],
			},
			{ validator: this.passwordConfirming }
		),
	});

	loading = false;
	submitted = false;

	constructor(
		private auth: AuthService,
		private fb: FormBuilder,
		private toast: ToastService
	) {}

	ngOnInit(): void {}

	passwordConfirming(c: AbstractControl): { invalid: boolean } {
		if (c.get('password').value !== c.get('retypePassword').value) {
			return { invalid: true };
		}
	}

	onSubmit() {
		this.submitted = true;
		if (this.register.valid) {
			this.loading = true;
			const { email, passwords } = this.register.value;
			this.auth.signup(email, passwords.password).subscribe(
				() => {
					this.loading = false;
					this.toast.addToast('Verification emails sent', 'success');
				},
				(err) => {
					console.log(err);
					this.loading = false;
				}
			);
		}
	}
}
