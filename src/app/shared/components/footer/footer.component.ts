import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { SpecializationService } from 'src/app/services/specialization/specialization.service';
import { SurgeriesService } from 'src/app/services/surgies/surgeries.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class FooterComponent implements OnInit {

  screenWidth = 0;
  specialities: any[] = [];
  surgeries: any[] = [];
  groupedList: any[] = [];
  helpMenu: string;
  toggleData: any = {
    home: '',
    patients: '',
    proctology: '',
    lapro: '',
    ortho: '',
    gyna: '',
    urology: '',
    vascular: ''
  };


  constructor(
    private modalService: NgbModal,
    public router: Router,
    public userService: UserService,
    private specializationService: SpecializationService,
    private surgeriesService: SurgeriesService,
  ) {
    this.helpMenu = 'out';
    this.toggleData = {
      home: 'out',
      patients: 'out',
      proctology: 'out',
      lapro: 'out',
      ortho: 'out',
      gyna: 'out',
      urology: 'out',
      vascular: 'out',
    }
  }

  ngOnInit(): void {
    this.getAllSpecializations();
  }

  toggleHelpMenu(menu: string): void {
    if (this.screenWidth > 600) {
      return;
    }
    this.toggleData[menu] = this.toggleData[menu] == 'out' ? 'in' : 'out';
    Object.keys(this.toggleData).forEach((td) => {
      if (td !== menu) {
        this.toggleData[td] = 'out';
      }
    });
    this.helpMenu = this.helpMenu === 'out' ? 'in' : 'out';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    this.screenWidth = screenWidth;
    if (screenWidth < 600) {
      Object.keys(this.toggleData).forEach((td) => {
          this.toggleData[td] = 'out';
      });
      this.helpMenu = 'out';
    } else {
      this.helpMenu = 'in';
      Object.keys(this.toggleData).forEach((td) => {
        this.toggleData[td] = 'in';
    });
    }
  }

  askDoctor() {
    if (!this.userService.getCurrentUser()) {
      this.openLogin();
    } else {
      this.router.navigate(['/ask-doctor']);
    }

  }

  openLogin() {
    this.modalService.open(LoginComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
  }

  getAllSpecializations() {
    this.specializationService.getAllSpecializations().subscribe((specialists) => {
      if (specialists && specialists.length > 0) {
        // console.log(specialists);
        this.specialities = specialists;
        this.specialities.forEach((spl) => {
          this.toggleData[spl.name] = 'out';
        });

        this.onResize();
        this.surgeriesService.getAllSurgeries(100, 0, 0).subscribe({
          next: (surgeriesList) => {
            this.groupedList = this.groupBy(surgeriesList, 'specializationId');

            specialists.forEach((sp: any) => {
              sp['surgeries'] = this.groupedList[sp.id];
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

  groupBy(xs: any[], key: string) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
