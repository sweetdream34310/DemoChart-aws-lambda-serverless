import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMoreOptionsComponent } from './icon-more-options.component';

describe('IconMoreOptionsComponent', () => {
  let component: IconMoreOptionsComponent;
  let fixture: ComponentFixture<IconMoreOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconMoreOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconMoreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
