import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifySurgeriesComponent } from './simplify-surgeries.component';

describe('SimplifySurgeriesComponent', () => {
  let component: SimplifySurgeriesComponent;
  let fixture: ComponentFixture<SimplifySurgeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplifySurgeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplifySurgeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
