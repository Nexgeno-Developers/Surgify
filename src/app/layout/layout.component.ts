import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../services/appointment/appointment.service';
import { HospitalService } from '../services/hospital/hospital.service';
import { SpecializationService } from '../services/specialization/specialization.service';
import { SurgeriesService } from '../services/surgies/surgeries.service';
import { BookingComponent } from '../shared/components/booking/booking.component';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  showCar = false;
  specialities:any[] = [];
  surgeries: any[] = [];
  allSurgeries: any[] = [];
  visibleCount = 0;
  videoReqForm: FormGroup;
  allHospitals: any = [];
  hospitals: any[] = [];
  currentVideo: any;
  moreSurgeries = false;
  /* https://www.youtube.com/watch?v=xZMbj4GXAoI
https://www.youtube.com/shorts/tjRTxKdIqic
https://www.youtube.com/shorts/iQ3bV0QcWVA
https://www.youtube.com/shorts/ibNe6LcbeF4 */
  youtubeVideos: any[] = [
    { url: "xZMbj4GXAoI", desciption: 'Mr Anil is back to his healthy & amazing life after his succesful surgery with @surgify' },
    { url: "tjRTxKdIqic", description: 'Mr. sagar borigam experiencing a kidney stone surgery with surgify' },
    { url: "iQ3bV0QcWVA", description: 'Mallesham Borigam at Surgify' },
    { url: "ibNe6LcbeF4", description: 'Varsha rajgole with a successful hernia surgery at SURGIFY' }
  ];
  testimonialData = [
    {
      name: 'Mr. Shantaram, 48Yrs',
      location: 'Hyderabad',
      text: 'I was having a lot of trouble while sitting or doing my daily activities. I got my hip replacement surgery done from Surgify. The doctors were very helpful, overall a very good service by the staff, i didn\'t have to worry about food or my transportation.'
    },
    {
      name: 'Mr. Prakash, 48Yrs',
      location: 'Mumbai',
      text: "I was suffering with Piles and until I got my surgery done life was very stressful living with Piles. But after my surgery from Surgify I am very relaxed now there is no pain or discomfort, I got everything done quickly by Surgify team. I will surely recommend this service."
    },
    {
      name: 'Mrs. Varsha, 43Yrs',
      location: 'Hyderabad',
      text: "Was suffering with Hernia for the past 8 months, then I contacted Surgify and got my appointment and surgery. I got the right treatment at the right time, with all the facilities like food and pick up drop from my home, even the room was very good and comfortable."
    },
    {
      name: 'Mrs. Jayshree, 56yrs',
      location: 'Hyderabad',
      text: "We got a cataract surgery done for my mother who is 75, we were worried about the mediclaim but with Surgify we got all the benefits, till our Surgery they had their representative with us so we got all the help pickup and drop, food was also tasty and comfortable rooms to stay for the patient relative.A very good experience with Surgify."
    },
    {
      name: 'Mrs. Anna Iturbe',
      location: 'Hyderabad',
      text: 'Very pleased with the company. Everything was done in a timely manner. Your service and assistance with the process were very, very good. I would refer Surgify to my friends and family.'
    },
    {
      name: 'Mrs. Lara Atkinson',
      location: 'Hyderabad',
      text: 'Very pleased with the company. Everything was done in a timely manner. Your service and assistance with the process were very, very good. I would refer Surgify to my friends and family.'
    }
  ];
  randomSurgeries: any[] = [

  ];

  surgeriesPerfom: any = [];
  surgeriesPerfomLoading = true;

  constructor(private specializationService: SpecializationService,
    private surgeriesService: SurgeriesService,
    private modalService: NgbModal,
    private appointmentService: AppointmentService,
    private router: Router,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    public sanitizer: DomSanitizer,
    private titleService: Title,
    private meta: Meta) {
    this.videoReqForm = this.fb.group({
      patientName: new FormControl('', Validators.required),
      mobileNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")])
    });
    this.onResize();
    this.titleService.setTitle('Sugify is one-stop solution for surgeries');
    this.meta.updateTag({ content: '' }, "name='keywords'");
    this.meta.updateTag({ content: '' }, "name='description'")

    // let videos = Object.assign([], this.youtubeVideos);
    // let sanity: any[] = [];
    // videos.forEach((vid, ind) => {
    //   sanity.push(this.sanitizer.bypassSecurityTrustUrl(videos[ind]));
    // });


    // this.youtubeVideos = [];
    // this.youtubeVideos = sanity;

  }

  ngOnInit(): void {
    this.showCar = true;
    this.getAllSpecializations();
    this.getAllHospitals();
  }

  getAllSpecializations() {
    this.surgeriesPerfomLoading = true;
    this.specializationService.getAllSpecializations().subscribe({
      next: (specialists) => {
        if (specialists && specialists.length > 0) {

          specialists.forEach((sp: any, spInd: number) => {
            this.surgeriesService.getAllSurgeriesBySpecialization(sp.id).subscribe((surgeries) => {
              this.surgeries.push({ specialization: sp.name, surgeries: surgeries });
              this.allSurgeries = this.allSurgeries.concat(surgeries);
              this.surgeriesPerfomLoading = false;
              if (spInd == specialists.length - 1) {
                // console.log(spInd, specialists);
                this.allSurgeries.forEach((sur, ind) => {
                  let findIt = this.randomSurgeries.find((s) => s.name.toLowerCase() == sur.name.toLowerCase());
                  if (!findIt) {
                    this.randomSurgeries.push(sur);
                  } else {

                  }
                });


                if (this.allSurgeries.length == this.randomSurgeries.length) {
                  this.surgeriesPerfomLoading = false;
                  this.setRandom();
                }

              }

            }, (err) => {
              // console.log(err);
            });
          });
        }
        this.specialities = specialists;

      }, error: (error) => {
        // console.log(error);
      }
    })
  }

  openBookDialog(specialization?:any) {
    const mod = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    if(specialization){
      let found = this.allSurgeries.find((sur)=> sur.name.toLowerCase()==specialization.toLowerCase());
      mod.componentInstance.disease = found;
    }
  }


  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  setRandom() {
    let randomNums: number[] = [];
    let len = this.allSurgeries.length - 1;
    // console.log(this.allSurgeries.length, this.randomSurgeries.length);
    for (let i = 0; randomNums.length <= len; i++) {
      let num = this.randomInteger(0, len);
      if (randomNums.indexOf(num) == -1) {
        randomNums.push(num);
      }
    }

    this.surgeriesPerfom = [];
    let tempAssign: any = [];
    randomNums.forEach((num) => {
      tempAssign.push(this.randomSurgeries[num]);
    });
    this.surgeriesPerfomLoading = false;
    this.surgeriesPerfom = tempAssign;
    // console.log(this.surgeriesPerfom);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    if (screenWidth < 500) {
      this.visibleCount = 2;
    } else if (screenWidth < 640) {
      this.visibleCount = 3;
    } else if (screenWidth < 800) {
      this.visibleCount = 4;
    } else if (screenWidth < 990) {
      this.visibleCount = 5;
    } else {
      this.visibleCount = 6;
    }
  }


  submitVideReq() {
    if (this.videoReqForm.invalid) return;
    let formData = this.videoReqForm.value;
    formData['isVideoReq'] = 'true';
    this.appointmentService.bookAppointment(formData).subscribe({
      error: (err) => {
        // console.log(err);
      },
      next: (result) => {
        if (result) {
          this.videoReqForm.reset();
        }
      }
    })
  }


  togglePopover(popover: NgbPopover, index: number) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({ data: this.testimonialData[index - 1] });
    }
  }

  goToDetail(surgery: any) {
    let speciality = this.specialities.find((sp)=> sp?.id===surgery.specializationId);

    let findIt = this.randomSurgeries.find((s) => s.name.toLowerCase() == surgery.name.toLowerCase());
    if(speciality && findIt){
      this.router.navigateByUrl(speciality?.slug + '/' + surgery?.slug);
    }
    
  }

  hasError(name: string, errorType: string) {
    let control = this.videoReqForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

  validateInput(event: any) {
    if (typeof event.target.value == "number") {

    } else {
      event.preventDefault();
    }
  }

  getAllHospitals() {
    this.hospitalService.getAllHospitals(6).subscribe((list) => {
      if (list && list.length > 0) {
        this.allHospitals = list;
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

  openVideo(videoId: any, content: any) {
    this.currentVideo = videoId;
    this.modalService.open(content, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup videoPup' })
      .shown.subscribe({
        next: (s) => {
          let ele = document.getElementById('videoP')?.querySelector('iframe')?.classList.add('ngVideo');

        },
        error: (err) => {
        }
      });
  }
}
