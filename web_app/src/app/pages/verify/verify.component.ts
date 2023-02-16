import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-verify',
	templateUrl: './verify.component.html',
	styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
	loading = false;
	message: string;
	error = false;

	constructor(private auth: AuthService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.loading = true;

		this.route.queryParams.subscribe((params) => {
			const { username, code } = params;

			this.auth.confirmSignUp(username, code).subscribe(
				(res) => {
					console.log(res);
					this.loading = false;
					this.message =
						'Your account has successfully been activated.';
				},
				(err) => {
					console.log(err);
					this.loading = false;
					this.error = true;
					this.message =
						'Error during account activation, please try again';
				}
			);
		});
	}
}
