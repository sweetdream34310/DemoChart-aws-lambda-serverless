import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-mydemo-box',
  templateUrl: './mydemo-box.component.html',
  styleUrls: ['./mydemo-box.component.scss']
})
export class MydemoBoxComponent implements OnInit {
	@Input() isDisabled = false;


  constructor() { }

  ngOnInit(): void {
  }

}
