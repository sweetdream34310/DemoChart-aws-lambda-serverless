import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDemosComponent } from './profile-demos.component';

describe('ProfileDemosComponent', () => {
  let component: ProfileDemosComponent;
  let fixture: ComponentFixture<ProfileDemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDemosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
