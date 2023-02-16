import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDemo} from "../../types/Demo";
import {YesNoModalComponent} from "../yes-no-modal/yes-no-modal.component";
import {switchMap} from "rxjs/operators";

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import {EMPTY} from "rxjs";
import {ModalService} from "../../services/modal.service";
import {HttpService} from "../../services/http.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
	@Input() demo;
	@Input() playingUid;

	@Output() playDemo: EventEmitter<any> = new EventEmitter();
	@Output() refetchDemos: EventEmitter<any> = new EventEmitter();


	faPlay = faPlay;
	faPause = faPause;
	faTrash = faTrashAlt;

	songDetailsHoursBlocked = 48;
	songRemainingDays = 60;


	constructor(
		private http: HttpService,
		private toast: ToastService,
		private modal: ModalService
	) { }

  ngOnInit(): void {
  }


	play(demo: IDemo) {
		this.playDemo.emit(demo);
	}

	deleteSong(songID: string) {
		const modal = this.modal.open(YesNoModalComponent, null);
		modal.afterClosed$
			.pipe(
				switchMap((e) =>
					e.data ? this.http.deleteSong(songID) : EMPTY
				)
			)
			.subscribe(
				(res) => {
					this.refetchDemos.emit();
					this.toast.addToast(
						`Successfully deleted the demo`,
						'success'
					);
				},
				(err) => {
					this.toast.addToast(
						`Error during deleting the demo, please try again later`,
						'error'
					);
				}
			);
	}

}
