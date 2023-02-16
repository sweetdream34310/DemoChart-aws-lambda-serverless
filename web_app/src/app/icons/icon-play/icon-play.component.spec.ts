import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPlayComponent } from './icon-play.component';

describe('IconPlayComponent', () => {
  let component: IconPlayComponent;
  let fixture: ComponentFixture<IconPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
