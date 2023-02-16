import { Component, OnInit } from '@angular/core';
import {
	Validators,
	FormBuilder,
	AbstractControl,
	FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
	selector: 'app-resetpassword',
	templateUrl: './resetpassword.component.html',
	styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
	firstStep = this.fb.group({
		email: [, Validators.email],
	});

	secondStep = this.fb.group({
		code: [, Validators.required],
	});

	thirdStep = this.fb.group({
		passwords: this.fb.group(
			{
				password: [
					,
					[
						Validators.required, Validators.minLength(8)
					],
				],
				retypePassword: [
					,
					[Validators.required, Validators.minLength(8)],
				],
			},
			{ validator: this.passwordConfirming }
		),
	});

	loading = false;
	submitted = false;
	step = 0;
	showCodeMismatchError = false;

	constructor(private auth: AuthService, private fb: FormBuilder, private route: Router, private toast: ToastService) {}

	ngOnInit(): void {}

	passwordConfirming(c: AbstractControl): { invalid: boolean } {
		if (c.get('password').value !== c.get('retypePassword').value) {
			return { invalid: true };
		}
	}

	step1Submit() {
		this.submitted = true;
		if (this.firstStep.valid) {
			this.loading = true;
			this.auth.resetPassword(this.firstStep.value.email).subscribe(
				(res) => {
					this.submitted = false;
					this.loading = false;
					this.step++;
				},
				(err) => {
					console.log(err);
					this.loading = false;

					if (err.code === "LimitExceededException") {
						this.toast.addToast(
							`You have reached the maximum amount of retries. Please try again later`,
							'error'
						);

					}
				}
			);
		}
	}

	submitCode() {
		if (this.secondStep.valid) {
			this.step++;
		}
	}

	submitNewPassword() {
		this.submitted = true;
		if (this.thirdStep.valid) {
			this.loading = true;
			const { email } = this.firstStep.value;
			const { code } = this.secondStep.value;
			const { passwords } = this.thirdStep.value;

			this.auth.verifyPassword(email, code, passwords.password).subscribe(
				(res) => {
					this.loading = false;

					this.toast.addToast(
						`Password successfully changed`,
						'success'
					);

					this.route.navigate(['/login']);
				},
				(err) => {
					console.log(err);
					this.loading = false;

					if (err.code === 'CodeMismatchException') {
						this.showCodeMismatchError = true;
						this.step = 1;
					}
				}
			);
		}
	}

	// Get form controls
	get passwords() {
		return this.thirdStep.get('passwords') as FormGroup;
	}

	get password() {
		return this.passwords.get('password');
	}
}
