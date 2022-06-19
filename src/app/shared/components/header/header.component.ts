import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { SpecializationService } from 'src/app/services/specialization/specialization.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';
import { UserService } from 'src/app/services/user/user.service';
import { BookingComponent } from '../booking/booking.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  specialities: any[] = [];
  surgeries: any[] = [];
  cities: any[] = []
  toggleHamburger = false;
  toggleHamburgerMobile = false;
  toggleHamburgerMobileSub = false;
  menuList: any[] = [
    { label: 'our-surgeries', isOpen: false },
    { label: 'our-patients', isOpen: false },
    { label: 'team-surgify', isOpen: false }
  ];

  constructor(private specializationService: SpecializationService,
    private surgeriesService: SurgeriesService,
    private modalService: NgbModal,
    public router: Router,
    private doctorService: DoctorService,
    public userService: UserService,
    private render: Renderer2,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params && params['showLogin']) {
          this.openLogin();
        }
      },
      error: (err) => {
      }
    })
  }

  ngOnInit(): void {
    this.getAllSpecializations();
    let token = localStorage.getItem('token');
    if (token) {
      let parsed = JSON.parse(token);
      this.userService.currentUser = parsed;
    }
    this.cities = [
      { name: 'Hyderabad', id: '1' },
      { name: 'Mumbai', id: '2' },
      { name: 'Bangalore', id: '3' },
      { name: 'Delhi', id: '4' },
      { name: 'Chennai', id: '5' },
      { name: 'Kolkata', id: '6' },
      { name: 'Pune', id: '7' },
      { name: 'Nagpur', id: '8' },
      { name: 'Nasik', id: '9' },
      { name: 'Ahmedabad', id: '10' },
      { name: 'Luknow', id: '11' },
      { name: 'Bhopal', id: '12' },
      { name: 'Ranchi', id: '13' },
      { name: 'Jaipur', id: '14' }



      //o	Mumbai, Delhi, Bangalore, Hyderabad, , , Pune, , , , , ,  & 
    ]
  }


  getAllSpecializations() {
    this.specializationService.getAllSpecializations().subscribe((specialists) => {
      if (specialists && specialists.length > 0) {
        // console.log(specialists);
        this.specialities = specialists;
        this.specialities.forEach((spl) => {
          this.menuList.push({ label: spl.name, isOpen: false });
        });
        localStorage.setItem('specialities', JSON.stringify(this.specialities));

        this.surgeriesService.getAllSurgeries(100, 0, 0).subscribe({
          next: (surgeriesList) => {
            let groupedList = this.groupBy(surgeriesList, 'specializationId');

            specialists.forEach((sp: any) => {
              sp['surgeries'] = groupedList[sp.id];
            });

          },
          error: (err) => {
          }
        });
      }


    }, error => {
      // console.log(error);
    });
  }


  openBookAppointment() {
    let modalRef = this.modalService.open(BookingComponent, { windowClass: 'appointment-modal ', modalDialogClass: 'modal-dialog-centered' });
    modalRef.componentInstance.doctor = this.doctorService.currentDoctor;
    modalRef.componentInstance.disease = this.surgeriesService.currentDisease;
  }

  openSurgeryDetails(surgery: any) {
    let url = '/surgery-details/' + surgery?.name + '/' + surgery?.id;
    this.router.navigateByUrl(url);

  }

  openLogin() {
    this.modalService.open(LoginComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
  }

  openSignUp() {
    this.modalService.open(SignUpComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
  }

  openVerify() {
    let modalRef = this.modalService.open(VerifyAccountComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
    modalRef.componentInstance.email = 'saikiranjgl@gmail.com';
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.currentUser = null;
    window.location.href = "/";
  }

  onCitySelect(city: any) {
    this.modalService.dismissAll();
    this.userService.setCurrentCity(city);
  }

  openCityModal(cityModal: any) {
    this.modalService.open(cityModal, { windowClass: 'city-modal', modalDialogClass: 'modal-dialog-centered' });
  }

  toggleMenu() {
    if (!this.toggleHamburger) {
      this.render.addClass(document.body, "show-menu");
    } else {
      this.render.removeClass(document.body, "show-menu");
      // this.toggleHamburgerMobile = false;
      // this.toggleHamburgerMobileSub = false;
    }
    this.toggleHamburger = !this.toggleHamburger;
  }

  toggleMenuMobile(menu: any) {
    this.menuList.forEach((men: any) => {
      if (menu == men.label) {
        men['isOpen'] = !men['isOpen'];
      } else {
        men['isOpen'] = false;
      }
    });
  }


  toggleMenuSubMobile(speciality: any) {
    if (!speciality['open']) {
      speciality['open'] = true;
    } else {
      speciality['open'] = false;
    }

    this.specialities.forEach((sp) => {
      if (sp.id != speciality.id) {
        sp['open'] = false;
      }
    });
  }

  public hideHamburger(speciality: any) {
    this.toggleHamburger = !this.toggleHamburger;
    this.toggleHamburgerMobile = !this.toggleHamburgerMobile;

    this.specialities.forEach((sp) => {
      if (sp.id != speciality.id) {
        sp['open'] = false;
      }
    });

    this.render.removeClass(document.body, "show-menu");
  }

  setStyleByWidth(speciality: any) {
    if (window.innerWidth - 17 > 1253) {
      return '';
    }

    return (speciality['open']) ? 'show' : '';
  }


  askDoctor() {
    this.toggleMenu();
    if (!this.userService.getCurrentUser()) {
      this.openLogin();
    } else {
      this.router.navigate(['/ask-doctor']);
    }

  }

  topMenuClass(menu: any) {
    let foundM = this.menuList.find((men: any) => menu == men.label);
    if (foundM && (window.innerWidth - 17 < 1253) ) {
      return foundM['isOpen'] ? 'show' : '';
    }
    return '';
  }

  groupBy(xs: any[], key: string) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  setStyleForDM() {
    if (window.innerWidth - 17 > 1253) {
      return {};
    } else {
      return { display: 'none' };
    }
  }

  setStyleForM(){
    if (window.innerWidth - 17 > 1253) {
      return { display: 'none' };
    } else {
      return {};
    }
  }

}
