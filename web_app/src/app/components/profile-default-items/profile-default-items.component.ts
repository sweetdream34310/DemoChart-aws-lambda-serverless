import {Component, Input, OnInit} from '@angular/core';
import {IProfileListItem} from "../../types/Profile";
import { faLink, } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-default-items',
  templateUrl: './profile-default-items.component.html',
  styleUrls: ['./profile-default-items.component.scss']
})
export class ProfileDefaultItemsComponent implements OnInit {

	@Input() items: IProfileListItem[];
	@Input() isMe: boolean;
	@Input() emptyText: any;


	faLink = faLink;

  constructor() { }

  ngOnInit(): void {
  }

	navigate(item: any): void {
		if (item.link) {
			const link = item.link.startsWith('https://') ? item.link : `https://${item.link}`;
			window.open(link, '_blank');
		}
	}

}
