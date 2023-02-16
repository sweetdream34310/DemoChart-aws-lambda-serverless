import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDefaultItemsComponent } from './profile-default-items.component';

describe('ProfileDefaultItemsComponent', () => {
  let component: ProfileDefaultItemsComponent;
  let fixture: ComponentFixture<ProfileDefaultItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDefaultItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDefaultItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
