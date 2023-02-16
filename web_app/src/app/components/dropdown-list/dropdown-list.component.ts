import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent implements OnInit {

	constructor() { }

	@Input() items;

	@Output() onSelect: EventEmitter<boolean> = new EventEmitter();
	@Input() keyFunction = (el) => el.id;
	@Input() labelFunction = (el) => el.label;

  ngOnInit(): void {
  }

}
