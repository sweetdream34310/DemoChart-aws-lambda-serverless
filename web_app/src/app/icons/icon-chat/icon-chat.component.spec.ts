import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChatComponent } from './icon-chat.component';

describe('IconChatComponent', () => {
  let component: IconChatComponent;
  let fixture: ComponentFixture<IconChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
