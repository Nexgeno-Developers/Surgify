import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from '../login/login.component';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  showPassword = false;
  showSuggestion = false;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private fb: FormBuilder,
    private render: Renderer2) {

    this.signUpForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      password: new FormControl('', Validators.required),
      gender: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  openLogin() {
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(LoginComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
    modalRef.result.then((val) => {
      this.render.removeStyle(document.body, 'overflow');
    }, (rej) => {
      this.render.removeStyle(document.body, 'overflow');
    });
  }

  signUp() {
    this.userService.signUp(this.signUpForm.value).subscribe({
      next: (value) => {
        // console.log(value);
        this.modalService.dismissAll();

        this.userService.sendVerificationCode(this.signUpForm.value.email).subscribe({
          next: (send) => {
            let modalRef = this.modalService.open(VerifyAccountComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
            modalRef.componentInstance.email = this.signUpForm.value.email;
            modalRef.result.then((val) => {
              this.render.removeStyle(document.body, 'overflow');
            }, (rej) => {
              this.render.removeStyle(document.body, 'overflow');
            });
          }
        })


      },
      error: (err: any) => {
        // console.log(err);
        alert(err.error.error.message);
      }
    })
  }

  hasError(name: string, errorType: string) {
    let control = this.signUpForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

}
