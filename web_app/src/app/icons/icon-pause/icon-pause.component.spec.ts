import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPauseComponent } from './icon-pause.component';

describe('IconPauseComponent', () => {
  let component: IconPauseComponent;
  let fixture: ComponentFixture<IconPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
