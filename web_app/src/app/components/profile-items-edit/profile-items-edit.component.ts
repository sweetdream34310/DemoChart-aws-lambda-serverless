import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {IProfileListItem} from '../../types/Profile';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-items-edit',
  templateUrl: './profile-items-edit.component.html',
  styleUrls: ['./profile-items-edit.component.scss']
})
export class ProfileItemsEditComponent implements OnInit {

	@Input() filteredItems: IProfileListItem[];
	@Input() itemType: string;

	@Output() deleteItem: EventEmitter<any> = new EventEmitter();
	@Output() addItem: EventEmitter<any> = new EventEmitter();

	@Input() title: string;

	faTrash = faTrash;

	addProfileListItem = this.fb.group({
		title: [, [Validators.required]],
		header: [, [Validators.required]],
		description: [, [Validators.required]],
		dateString: [, [Validators.required]],
		link: [],
	});

	showInputHint = false;

  constructor(
		private fb: FormBuilder,
		) { }

  ngOnInit(): void {
  }

	add() {
		this.addProfileListItem.get('title').setValue(this.itemType);

		console.log(this.addProfileListItem)

		if (this.addProfileListItem.valid) {
			const value = this.addProfileListItem.value;
			this.addItem.emit(value);
		} else {
			this.showInputHint = true;
		}
	}

	remove(item: IProfileListItem) {
  	this.deleteItem.emit(item);
	}

}
