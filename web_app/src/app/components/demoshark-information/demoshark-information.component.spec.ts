import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemosharkInformationComponent } from './demoshark-information.component';

describe('DemosharkInformationComponent', () => {
  let component: DemosharkInformationComponent;
  let fixture: ComponentFixture<DemosharkInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemosharkInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemosharkInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
