import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
		private http: HttpService,
		private toast: ToastService,
	) { }

  ngOnInit(): void {}

	resetDB() {
		this.toast.addToast(
			`Started resetting db...`,
			'info'
		);

		this.http.initDB().subscribe(res => {
			this.toast.addToast(
				`DB Reset succeded!`,
				'info'
			);
		}, err => {
			this.toast.addToast(
				`DB Reset failed`,
				'error'
			);
		});
	}

	updateDB() {
		this.toast.addToast(
			`Started updating db...`,
			'info'
		);

		this.http.updateDB().subscribe(res => {
			this.toast.addToast(
				`DB update succeded!`,
				'info'
			);
		}, err => {
			this.toast.addToast(
				`DB update failed`,
				'error'
			);
		});
	}

}
