import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhySurgifyComponent } from './why-surgify.component';

describe('WhySurgifyComponent', () => {
  let component: WhySurgifyComponent;
  let fixture: ComponentFixture<WhySurgifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhySurgifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhySurgifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
