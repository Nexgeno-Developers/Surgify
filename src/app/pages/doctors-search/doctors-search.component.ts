import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-doctors-search',
  templateUrl: './doctors-search.component.html',
  styleUrls: ['./doctors-search.component.css']
})
export class DoctorsSearchComponent implements OnInit {

  isLoading = true;
  doctors: any[] = [];
  allDoctors: any[] = [];
  searchText: string = "";
  showResults = false;
  textSearch = '';
  locations: string[] = [];
  selectedLoc: string = '';
  constructor(private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.allDoctors = doctors;
        this.allDoctors.forEach((doc) => {
          if (doc && doc.location) {
            doc.location.forEach((loc: string) => {
              if (this.locations.indexOf(loc) == -1) {
                this.locations.push(loc);
              }
            })
          }
        })
        this.setRandom();

      },
      error: (err) => {
        // console.log(err);
        this.isLoading = false;
      }
    });
  }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  setRandom() {
    let randomNums: number[] = [];
    let len = this.allDoctors.length - 1;
    // console.log(this.allSurgeries.length, this.randomSurgeries.length);
    for (let i = 0; randomNums.length <= len; i++) {
      let num = this.randomInteger(0, len);
      if (randomNums.indexOf(num) == -1) {
        randomNums.push(num);
      }
    }

    this.doctors = [];
    let tempAssign: any = [];
    randomNums.forEach((num) => {
      tempAssign.push(this.allDoctors[num]);
    });
    window.scroll({
      top: 0, behavior: 'smooth', left: 0
    });
    this.doctors = tempAssign;
    this.isLoading = false;
    // console.log(this.surgeriesPerfom);
  }

  findDocs() {
    this.isLoading = true;
    this.textSearch = this.searchText;
    this.doctorService.findDoctorsBySurgeryNLocation(this.searchText, this.selectedLoc).subscribe({
      next: (docs) => {
        this.showResults = true;
        if (docs && !docs.error) {
          this.allDoctors = docs;
          this.setRandom();
        } else {
          this.allDoctors = [];
          this.setRandom();
        }
      },
      error: (err) => {

      }
    });
  }

}
