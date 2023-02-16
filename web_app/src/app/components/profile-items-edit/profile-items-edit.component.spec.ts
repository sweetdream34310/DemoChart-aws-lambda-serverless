import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileItemsEditComponent } from './profile-items-edit.component';

describe('ProfileItemsEditComponent', () => {
  let component: ProfileItemsEditComponent;
  let fixture: ComponentFixture<ProfileItemsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileItemsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileItemsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
