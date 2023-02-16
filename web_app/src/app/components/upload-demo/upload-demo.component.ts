import { Component, OnInit } from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.scss']
})
export class UploadDemoComponent implements OnInit {

	@Select((state) => state.app.user.credits) credits$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
