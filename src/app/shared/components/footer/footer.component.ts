import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
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
  helpMenu: string;
  toggleData: any = {
    home: '',
    patients: '',
    proctology: '',
    lapro: '',
    ortho: '',
    gyna: '',
    urology: '',
    vascular: '',

  }
  constructor(
    private modalService: NgbModal,
    public router: Router,
    public userService: UserService
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
    this.onResize();
  }

  toggleHelpMenu(menu: string): void {
    if (this.screenWidth > 600) {
      return;
    }
    this.toggleData[menu] = this.toggleData[menu] == 'out' ? 'in' : 'out';
    this.helpMenu = this.helpMenu === 'out' ? 'in' : 'out';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    this.screenWidth = screenWidth;
    if (screenWidth < 600) {
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
      this.helpMenu = 'out';
    } else {
      this.helpMenu = 'in';
      this.toggleData = {
        home: 'in',
        patients: 'in',
        proctology: 'in',
        lapro: 'in',
        ortho: 'in',
        gyna: 'in',
        urology: 'in',
        vascular: 'in',
      }
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

}
