import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconStarOutlinedComponent } from './icon-star-outlined.component';

describe('IconStarOutlinedComponent', () => {
  let component: IconStarOutlinedComponent;
  let fixture: ComponentFixture<IconStarOutlinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconStarOutlinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconStarOutlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
