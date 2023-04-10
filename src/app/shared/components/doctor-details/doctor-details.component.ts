import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { BookingComponent } from '../booking/booking.component';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit, OnDestroy {

  doctorId = '';
  doctor: any;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private _location: Location) {
    this.route.params.subscribe((params: any) => {
      this.doctorId = params.docId;
      if (this.router.getCurrentNavigation()?.extras.state ?? ['doctor']) {
        let doctor = this.router.getCurrentNavigation()?.extras.state ?? ['doctor'];
        if (doctor?.['doctor']) {
          this.doctor = doctor['doctor'];
          // this.getDoctorById();
          window.scroll({
            top: 0, behavior: 'smooth', left: 0
          });
          this.doctorService.setCurrrentDoc(this.doctor);
        } else {
          this.getDoctorById();
        }
      } else {
        this.getDoctorById();
      }
    });
  }


  ngOnInit(): void {

  }

  openBookDialog() {
    let modalRef = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    modalRef.componentInstance.doctor = this.doctor;
  }

  getDoctorById() {
    this.doctorService.getDoctorById(this.doctorId).subscribe({
      next: (doc) => {
        this.doctor = doc;
        this.doctorService.setCurrrentDoc(this.doctor);
        window.scroll({
          top: 0, behavior: 'smooth', left: 0
        });
      },
      error: (err) => {
        // console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.doctor = null;
    this.doctorService.setCurrrentDoc(this.doctor);
  }

  goBack() {
    this._location.back();
  }
}
