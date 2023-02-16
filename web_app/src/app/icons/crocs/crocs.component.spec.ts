import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrocsComponent } from './crocs.component';

describe('CrocsComponent', () => {
  let component: CrocsComponent;
  let fixture: ComponentFixture<CrocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
