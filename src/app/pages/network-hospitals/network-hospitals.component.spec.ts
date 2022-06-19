import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkHospitalsComponent } from './network-hospitals.component';

describe('NetworkHospitalsComponent', () => {
  let component: NetworkHospitalsComponent;
  let fixture: ComponentFixture<NetworkHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
