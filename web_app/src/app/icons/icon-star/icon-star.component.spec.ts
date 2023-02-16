import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStarComponent } from './icon-star.component';

describe('IconStarComponent', () => {
  let component: IconStarComponent;
  let fixture: ComponentFixture<IconStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconStarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
