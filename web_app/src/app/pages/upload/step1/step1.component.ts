import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ToastService } from 'src/app/services/toast.service';
import { SetDemoFull } from 'src/app/state/upload.actions';
import {StepperComponent} from "../../../components/stepper/stepper.component";
import {Observable} from "rxjs";

@Component({
	selector: 'app-step1',
	templateUrl: './step1.component.html',
	styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
	@Input() stepper: StepperComponent;

	@Select((state) => state.app.user.credits) credits$: Observable<number>;

	constructor(private toast: ToastService, private store: Store) {}

	ngOnInit(): void {}

	onFileSelect(event: NgxDropzoneChangeEvent) {
		const files = event.addedFiles;
		if (files.length) {
			this.store.dispatch(new SetDemoFull(files[0]));
			this.stepper.goToNext();
		} else {
			this.toast.addToast('Please select a mp3', 'error');
		}
	}
}
