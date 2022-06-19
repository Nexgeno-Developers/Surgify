import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  selectedDisease: any='';
  selectedMonth: any='';
  bookingsList: any;
  diseases: any[] = [];
  months: any[] = [];
  bookingsCount: number = 0;
  pageNum = 0;
  pagesArr: any[] = [];
  isLoading = false;

  constructor(private bookingService: AppointmentService,
    private surgeryService: SurgeriesService) { }

  ngOnInit(): void {
    this.bookingService.getAllSpecializations({}).subscribe({
      next: (bookings) => {
        this.bookingsList = bookings;
      },
      error: (err) => {

      }
    });

    this.surgeryService.getAllSurgeries(100, 0, 0).subscribe({
      next: (diseases) => {
        this.diseases = diseases;
        this.getSurgeriesByPage();
      },
      error: (err) => {

      }
    })

    this.bookingService.getCountOfBookings().subscribe({
      next: (res) => {
        this.bookingsCount = res.count;
        for (let i = 0; i < (res.count / 20); i++)
          this.pagesArr.push(i);
      },
      error: (err) => {

      }
    });

    
  }

  getSurgeriesByPage() {
    this.isLoading = true;
    this.bookingService.getAllBookingsByPage(20, this.pageNum, (this.pageNum * 20)).subscribe({
      next: (bookings) => {
        this.bookingsList = bookings;
        this.bookingsList.forEach((booking: any) => {
          let foundDis = this.diseases.find((dis) => dis.id == booking.disease);
          if (foundDis) {
            booking['diseaseName'] = foundDis.name;
          }
          window.scroll({
            top: 0, behavior: 'smooth', left: 0
          });

        })
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      }
    });
  }

  nextPage() {
    this.pageNum++;
    this.getSurgeriesByPage();

  }

  prevPage() {
    this.pageNum--;
    this.getSurgeriesByPage();
  }


  goToPageIndex(pageNum: number) {
    this.pageNum = pageNum;
    this.getSurgeriesByPage();
  }

}
