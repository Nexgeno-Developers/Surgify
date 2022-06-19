import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  showInvalidPwdMsg = false;
  showRegisterMsg = false;
  unknownError = '';
  isAdmin=false;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private userService: UserService,
    private render: Renderer2,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  openSignUP() {
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(SignUpComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
    modalRef.result.then((val) => {
      this.render.removeStyle(document.body, 'overflow');
    }, (rej) => {
      this.render.removeStyle(document.body, 'overflow');
    });
  }

  openForgotPwd() {
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(ForgotPasswordComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
    modalRef.result.then((val) => {
      this.render.removeStyle(document.body, 'overflow');
    }, (rej) => {
      this.render.removeStyle(document.body, 'overflow');
    });
  }

  login() {
    this.userService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (token) => {
        this.userService.currentUser = token;
        localStorage.setItem('token', JSON.stringify(token));
        this.activeModal.close(true);
        this.getUserProfile();
      },
      error: (err) => {
        console.log(err);
        if (err.error && err.error.error.message == 'password is not valid') {
          this.showInvalidPwdMsg = true;
          this.showRegisterMsg = false;
        } else if (err.error && err.error.error.message == 'Your are not registed') {
          this.showRegisterMsg = true;
          this.showInvalidPwdMsg = false;
        } else {
          this.unknownError = err?.error?.error?.message;
        }
      }
    })
  }

  hasError(name: string, errorType: string) {
    let control = this.loginForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

  getUserProfile() {
    this.userService.getMyProfile().subscribe({
      next: (profile: any) => {
        if (profile && profile['isAdmin']) {
          this.isAdmin = profile['isAdmin'];
          window.location.reload();
        }
      },
      error: (error) => {

      }
    });
  }
}
