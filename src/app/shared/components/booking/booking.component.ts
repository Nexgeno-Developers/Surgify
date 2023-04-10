import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input()
  doctor: any;

  @Input()
  disease: any;

  isSubmitSuccess = false;

  diseases: any[] = [];

  bookingForm: FormGroup;
  constructor(private appointmentService: AppointmentService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private surgeriesService: SurgeriesService) {
    this.bookingForm = this.fb.group({
      patientName: ['', Validators.required],
      mobileNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$"), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      disease: new FormControl('', Validators.required),
      doctorId: new FormControl(''),
      doctorName: new FormControl('')
    });

    if (this.doctor) {
      this.bookingForm.get('doctorId')?.patchValue(this.doctor.id);
      this.bookingForm.get('doctorName')?.patchValue(this.doctor.name);
    }

    if (this.disease) {
      this.bookingForm.get('disease')?.patchValue(this.disease.id);
    }
  }

  ngOnInit(): void {
    if (this.doctor) {
      this.bookingForm.get('doctorId')?.patchValue(this.doctor.id);
      this.bookingForm.get('doctorName')?.patchValue(this.doctor.name);
    }

    if (this.disease) {
      this.bookingForm.get('disease')?.patchValue(this.disease.id);
    }

    this.getAllSurgeries();
  }

  bookMyAppointment() {
    if (this.doctor) {
      this.bookingForm.get('doctorId')?.patchValue(this.doctor.id);
      this.bookingForm.get('doctorName')?.patchValue(this.doctor.name);
    }

    if (this.disease) {
      this.bookingForm.get('disease')?.patchValue(this.disease.id);
    }

    let formData = this.bookingForm.value;
    this.appointmentService.bookAppointment(formData).subscribe({
      complete: () => {
      },
      error: (err) => {
        // console.log(err);
      },
      next: (result) => {
        if (result) {
          this.isSubmitSuccess = true;
        }
      }
    })
  }

  get formControls() {
    return this.bookingForm.controls;
  }

  hasError(name: string, errorType: string) {
    let control = this.bookingForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

  getAllSurgeries() {
    this.surgeriesService.getAllSurgeries().subscribe((surgeries) => {
      if (surgeries) {
        this.diseases = surgeries;
      }
    })
  }

}
