import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoadingAnimationComponent } from './page-loading-animation.component';

describe('PageLoadingAnimationComponent', () => {
  let component: PageLoadingAnimationComponent;
  let fixture: ComponentFixture<PageLoadingAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLoadingAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoadingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
