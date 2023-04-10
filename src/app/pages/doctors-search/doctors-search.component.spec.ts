import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSearchComponent } from './doctors-search.component';

describe('DoctorsSearchComponent', () => {
  let component: DoctorsSearchComponent;
  let fixture: ComponentFixture<DoctorsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
