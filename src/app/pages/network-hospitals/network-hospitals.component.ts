import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-network-hospitals',
  templateUrl: './network-hospitals.component.html',
  styleUrls: ['./network-hospitals.component.css']
})
export class NetworkHospitalsComponent implements OnInit {

  allHospitals: any = [];
  hospitals: any[] = [];
  isLoading = true;
  searchText = '';
  queryText = '';
  selectedLocation = '';

  constructor(private hospitalService: HospitalService) {
    window.scroll({
      top: 0, behavior: 'smooth', left: 0
    });
  }

  ngOnInit(): void {
    window.scroll({
      top: 0, behavior: 'smooth', left: 0
    });
    this.getAllHospitals();
  }


  getAllHospitals() {
    this.isLoading = true;
    this.hospitalService.getAllHospitals(100).subscribe((list) => {
      if (list && list.length > 0) {
        this.allHospitals = list;
        this.isLoading = false;
        this.setRandomHospitals();
      } else {
        this.allHospitals = [];
      }
    }, (err) => {
      this.allHospitals = [];
    });
  }

  setRandomHospitals() {
    let randomNums: number[] = [];
    let len = this.allHospitals.length - 1;
    // console.log(this.allSurgeries.length, this.randomSurgeries.length);
    for (let i = 0; randomNums.length <= len; i++) {
      let num = this.randomInteger(0, len);
      if (randomNums.indexOf(num) == -1) {
        randomNums.push(num);
      }
    }

    this.hospitals = [];
    let tempAssign: any = [];
    randomNums.forEach((num) => {
      tempAssign.push(this.allHospitals[num]);
    });
    this.hospitals = tempAssign;
    // console.log(this.surgeriesPerfom);
  }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  searchHospitals(){
    this.isLoading = true;
    this.hospitalService.searchHospitals(100, this.searchText, this.selectedLocation).subscribe({
      next: (list)=>{
        this.isLoading = false;
        if (list && list.length > 0) {
          this.allHospitals = list;
          this.setRandomHospitals();
        } else {
          this.allHospitals = [];
        }

      },
      error: (err)=>{
        this.isLoading=false;
        this.allHospitals = [];
      }
    })  
  }



}
