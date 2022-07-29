import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbAccordionModule, NgbCarouselModule, NgbDropdownModule, NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingComponent } from './components/booking/booking.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { DoctorsSummaryComponent } from './components/doctors-summary/doctors-summary.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { WhySurgifyComponent } from './components/why-surgify/why-surgify.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { AdminHeaderComponent } from './components/admin/header/header.component';
import { BlogSummaryComponent } from './components/blog-summary/blog-summary.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, BookingComponent, DoctorsSummaryComponent, DoctorDetailsComponent,
    WhySurgifyComponent, BookAppointmentComponent, LoginComponent, SignUpComponent, ForgotPasswordComponent, VerifyAccountComponent,
    AdminHeaderComponent,
    BlogSummaryComponent],
  imports: [CommonModule, NgbModule, NgbCarouselModule, RouterModule, NgbDropdownModule, FormsModule, ReactiveFormsModule],
  exports: [FooterComponent, HeaderComponent, NgbCarouselModule, CarouselModule, NgbAccordionModule, DoctorsSummaryComponent,
    WhySurgifyComponent, BookAppointmentComponent, FormsModule, NgbDropdownModule, LoginComponent, SignUpComponent,
  ReactiveFormsModule, NgbPopoverModule, AdminHeaderComponent, BlogSummaryComponent]
})
export class SharedModule { }
