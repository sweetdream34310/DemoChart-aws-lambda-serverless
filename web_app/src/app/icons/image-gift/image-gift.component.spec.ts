import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGiftComponent } from './image-gift.component';

describe('ImageGiftComponent', () => {
  let component: ImageGiftComponent;
  let fixture: ComponentFixture<ImageGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
