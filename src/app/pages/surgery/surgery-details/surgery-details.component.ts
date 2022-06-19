import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';
import { BookingComponent } from 'src/app/shared/components/booking/booking.component';

@Component({
  selector: 'app-surgery-details',
  templateUrl: './surgery-details.component.html',
  styleUrls: ['./surgery-details.component.css']
})
export class SurgeryDetailsComponent implements OnInit, OnDestroy {

  surgeryName: string = '';
  surgeryId: string = '';
  surgeryData: any = {};

  constructor(private route: ActivatedRoute,
    private surgeriesService: SurgeriesService,
    private modalService: NgbModal,
    private meta: Meta,
    private titleService: Title) {

    this.route.params.subscribe((params: any) => {
      this.surgeryId = params.id;
      this.surgeryName = params.name;
      this.parseSurgeryData();
      window.scroll({
        top: 0, behavior: 'smooth', left: 0
      });
    });

  }

  ngOnInit(): void {

  }

  parseSurgeryData() {
    this.surgeriesService.getSurgeryBySlug(this.surgeryId).subscribe((data) => {
      if (data) {
        this.surgeryData = data[0];
        this.surgeriesService.setCurrentDisease(data[0]);
        // this.meta.updateTag({});
        if (this.surgeryData.title) {
          this.titleService.setTitle(this.surgeryData.title);
          if (this.surgeryData.keywords && this.surgeryData.keywords.length > 0)
            this.meta.updateTag({ content: this.surgeryData.keywords.join(', ') }, "name='keywords'");
          this.meta.updateTag({ content: this.surgeryData.meta }, "name='description'")
        }
      }
    }, (err) => {

    });


  }


  openBookDialog() {
    let modalRef = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    modalRef.componentInstance.disease = this.surgeryData;
    modalRef.componentInstance.doctor = null;

  }


  ngOnDestroy(): void {
    this.surgeriesService.setCurrentDisease('');
  }

}
