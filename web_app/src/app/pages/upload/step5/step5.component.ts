import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {Select, Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import {GetUser} from "../../../state/user.actions";

@UntilDestroy()
@Component({
	selector: 'app-step5',
	templateUrl: './step5.component.html',
	styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit {
	@Select((state) => state.app.upload.songID) songID$: Observable<string>;
	@Select((state) => state.app.user.credits) credits$: Observable<number>;
	@Input() stepper: CdkStepper;

	loading = false;
	plan = '';

	constructor(
		private http: HttpService,
		private toast: ToastService,
		private router: Router,
		private store: Store
	) {}

	ngOnInit(): void {}

	buyWithCredits() {
		this.loading = true;
		this.plan = 'credits';
		this.songID$
			.pipe(
				switchMap((e) => this.http.buyWithCredits(e)),
				untilDestroyed(this)
			)
			.subscribe(
				(res) => {
					this.loading = false;
					console.log(res);

					this.store
						.dispatch(new GetUser())
						.pipe(map((_) => true));
					this.router.navigate(['mydemos']);
				},
				(err) => {
					this.loading = false;
					this.toast.addToast('Error with payment', 'error');
				}
			);
	}

	buyCredits(plan: string) {
		this.loading = true;
		this.plan = plan;
		this.songID$
			.pipe(switchMap((e) => this.http.buyCredits(plan, e)))
			.subscribe(
				(res) => {
					console.log(res);
					window.location.href = res;
				},
				(err) => {
					this.loading = false;
					this.toast.addToast('Error with payment', 'error');
				}
			);
	}
}
