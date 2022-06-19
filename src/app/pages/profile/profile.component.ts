import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  isEdit = true;
  chars: string = '';
  profileForm: FormGroup;
  changeMobileForm: FormGroup;
  showPassword = false;
  changePwdForm: FormGroup;
  changePwdError: string = '';
  showSuggestion = false;

  @ViewChild('numberUpdatedTemplate')
  numberUpdatedTemplate!: TemplateRef<any>;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    public modalService: NgbModal,
    private render: Renderer2,
    private router: Router) {
    this.profileForm = this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      gender: ['']
    });

    this.changeMobileForm = this.fb.group({
      currentNum: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      newNum: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    });

    this.changePwdForm = this.fb.group({
      password: ['', Validators.required, Validators.maxLength(8)],
      confirmPassword: ['', Validators.required, Validators.maxLength(8)],
      confirmNewPwd: ['', Validators.required, Validators.maxLength(8)],
      email: ['']
    });


  }

  ngOnInit(): void {

    this.userService.getMyProfile().subscribe({
      next: (user: any) => {
        this.user = user;
        this.profileForm.patchValue(this.user);
        let split = user.fullName.split(' ');

        if (split.length > 1) {
          this.chars = (split[0][0]) + '' + (split[1][0]);
        } else {
          this.chars = user.fullName[0] + '' + (user.fullName[user.fullName.length - 1]);
        }

      },
      error: (err) => {
        alert(err);
      }
    });
  }

  editProfile() {
    this.isEdit = true;
  }

  saveProfile() {
    console.log(this.profileForm.value);
    let profile = this.user;
    let data = this.profileForm.value;
    Object.keys(data).forEach((k) => {
      profile[k] = data[k];
    });
    this.userService.updateMyProfile(profile).subscribe((user) => {
      if (user && user.id) {
        this.isEdit = false;
        this.user = user;
        Swal.fire({
          icon: 'success',
          toast: true,
          timer: 3000,
          position: 'center',
          text: 'Profile Updated.'
        });
      } else {
        Swal.fire({
          icon: 'error',
          toast: true,
          timer: 3000,
          position: 'center',
          text: 'Error while updating profile.'
        });
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        toast: true,
        timer: 3000,
        position: 'center',
        text: 'Error while updating profile.'
      });
      console.log(error);
    });
  }

  openChangeMobNumModal(content: any) {
    this.modalService.open(content, { windowClass: 'loginPup', modalDialogClass: 'modal-dialog-centered' });
    this.changeMobileForm.get('currentNum')?.patchValue(this.user.mobileNo);
  }

  hasError(name: string, errorType: string) {
    let control = this.changeMobileForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

  hasPwdFormError(name: string, errorType: string) {
    let control = this.changePwdForm.get(name);
    return control?.touched && control?.hasError(errorType);
  }

  updateMobileNum() {
    console.log(this.changeMobileForm.value);
    let profile = this.user;
    profile['mobileNo'] = this.changeMobileForm.value.newNum;

    this.userService.updateMyProfile(profile).subscribe({
      next: (user) => {
        this.user = user;
        this.modalService.dismissAll();
        let modalRef = this.modalService.open(this.numberUpdatedTemplate, { windowClass: 'loginPup', modalDialogClass: 'modal-dialog-centered' });
        modalRef.result.then((val) => {
          this.render.removeStyle(document.body, 'overflow');
        }, (err) => {
          this.render.removeStyle(document.body, 'overflow');
        })
      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          text: 'Error while updating mobile number.'
        });
      }
    });
  }

  openChangePwd(content: any) {
    this.changePwdForm.reset();
    this.modalService.open(content, { windowClass: 'loginPup', modalDialogClass: 'modal-dialog-centered' });
  }

  changePassword(content: any) {
    let data = this.changePwdForm.value;
    data['email'] = this.user.email;
    // data.password = data.confirmPassword;
    data['resetKey'] = "helloworld";
    delete data['confirmNewPwd']
    this.userService.changePassword(data).subscribe((res) => {
      if (res) {
        this.modalService.dismissAll();
        this.modalService.open(content, { windowClass: 'loginPup', modalDialogClass: 'modal-dialog-centered' });
      }
    }, (err) => {
      if (err && err.error && err.error.error && err.error.error.message) {
        this.changePwdError = err.error.error.message;
      }
    });

  }

  loginNow() {
    localStorage.removeItem('token');
    this.userService.currentUser = null;
    this.modalService.dismissAll();
    this.router.navigate(['/'], { queryParams: { showLogin: true } });
  }

  onModalClose() {
    this.modalService.dismissAll();
    this.router.navigate(['/'], { queryParams: { showLogin: true } });
  }

}
