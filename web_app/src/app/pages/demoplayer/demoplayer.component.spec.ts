import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoplayerComponent } from './demoplayer.component';

describe('DemoplayerComponent', () => {
  let component: DemoplayerComponent;
  let fixture: ComponentFixture<DemoplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
