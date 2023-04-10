import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-doctors-summary',
  templateUrl: './doctors-summary.component.html',
  styleUrls: ['./doctors-summary.component.css']
})
export class DoctorsSummaryComponent implements OnInit {

  @Input()
  doctor: any;
  constructor(
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  goToDocDetails() {
    if (this.doctor.id)
      //this.router.navigateByUrl('/our-doctors/' + this.doctor?.id);
      this.router.navigate(['/our-doctors/' + this.doctor?.id], { state: { doctor: this.doctor } })
  }

  openBookDialog() {
    let modalRef = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    modalRef.componentInstance.doctor = this.doctor;

  }

}
