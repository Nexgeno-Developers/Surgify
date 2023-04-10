import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  @Input()
  doctor: any;

  @Input()
  disease: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openBookAppointment() {
    let modalRef = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    modalRef.componentInstance.doctor = this.doctor;
    modalRef.componentInstance.disease = this.disease;
  }

}
