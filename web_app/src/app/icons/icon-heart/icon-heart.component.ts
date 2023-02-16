import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-heart',
  templateUrl: './icon-heart.component.html',
  styleUrls: ['./icon-heart.component.scss']
})
export class IconHeartComponent implements OnInit {

	@Input() isActive = false;

  constructor() { }

  ngOnInit(): void {
  }

}
