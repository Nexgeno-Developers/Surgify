import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  @Input()
  email: any;
  code = '';
  isVerified = false;
  inprogress = true;
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  openLogin() {
    this.activeModal.dismiss();
    this.modalService.open(LoginComponent, { modalDialogClass: 'modal-dialog-centered', windowClass: 'loginPup' });
  }

  sendVerificationCode() {
    this.userService.sendVerificationCode(this.email).subscribe({
      next: (send) => {
        this.inprogress = false;
      }
    })
  }
  verifyAccount() {
    this.userService.verifyCode(this.code).subscribe({
      next: (result) => {
        this.isVerified = true;
        // console.log(result);
      }
    })
  }

}
