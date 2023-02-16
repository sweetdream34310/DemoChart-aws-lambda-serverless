import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydemoBoxComponent } from './mydemo-box.component';

describe('MydemoItemComponent', () => {
  let component: MydemoBoxComponent;
  let fixture: ComponentFixture<MydemoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydemoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydemoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
