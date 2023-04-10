import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: any;
  isSent = false;
  forgotForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private userService: UserService,
    private fb: FormBuilder,
    private render: Renderer2) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  openLogin() {
    this.activeModal.dismiss('');
    const modalRef = this.modalService.open(LoginComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
    modalRef.result.then((val) => {
      this.render.removeStyle(document.body, 'overflow');
    }, (rej) => {
      this.render.removeStyle(document.body, 'overflow');
    });
  }

  sendPassword() {
    this.userService.sendPassword(this.forgotForm.value.email).subscribe({
      next: (sent) => {
        this.isSent = true;
      },
      error: (err) => {
        // console.log(err);
        if (err.error && err.error.error && err.error.error.message) {
          alert(err.error.error.message);
        }
      }
    })
  }

  hasError(name: string, errorType: string) {
    let control = this.forgotForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

}
