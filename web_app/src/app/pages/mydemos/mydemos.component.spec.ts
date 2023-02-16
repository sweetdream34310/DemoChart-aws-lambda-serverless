import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydemosComponent } from './mydemos.component';

describe('MydemosComponent', () => {
  let component: MydemosComponent;
  let fixture: ComponentFixture<MydemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydemosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MydemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
