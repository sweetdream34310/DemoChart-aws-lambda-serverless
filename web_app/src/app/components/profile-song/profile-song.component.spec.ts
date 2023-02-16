import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSongComponent } from './profile-song.component';

describe('ProfileSongComponent', () => {
  let component: ProfileSongComponent;
  let fixture: ComponentFixture<ProfileSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
