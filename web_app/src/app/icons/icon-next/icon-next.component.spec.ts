import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNextComponent } from './icon-next.component';

describe('IconNextComponent', () => {
  let component: IconNextComponent;
  let fixture: ComponentFixture<IconNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
