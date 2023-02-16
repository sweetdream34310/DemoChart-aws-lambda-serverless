import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSettingsComponent } from './icon-settings.component';

describe('IconSettingsComponent', () => {
  let component: IconSettingsComponent;
  let fixture: ComponentFixture<IconSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
