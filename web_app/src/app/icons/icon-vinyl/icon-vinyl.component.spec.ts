import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconVinylComponent } from './icon-vinyl.component';

describe('IconVinylComponent', () => {
  let component: IconVinylComponent;
  let fixture: ComponentFixture<IconVinylComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconVinylComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconVinylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
