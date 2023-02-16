import {AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import {DOCUMENT} from '@angular/common';
import {ResetUpload, SetTitle} from "../../state/upload.actions";
import {Store} from "@ngxs/store";

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild('stepper') stepper: StepperComponent;
	index = 0;

	constructor(private route: ActivatedRoute, private router: Router, @Inject(DOCUMENT) private document: Document, private store: Store) {
		this.route.params.subscribe((res) => {
			const step = Number(res.step);

			if (!isNaN(step) && step > 0) {
				this.index = step - 1;
			} else {
				this.index = 0;
				this.router.navigate(['upload', 1]);
			}
		});

		this.store.dispatch(new ResetUpload());
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}

	ngAfterViewInit(): void {
		this.stepper.selectionChange.subscribe((e) => {
			const { selectedIndex } = e;
			this.index = selectedIndex;
			this.router.navigate(['upload', selectedIndex + 1]);
		});
	}
}
