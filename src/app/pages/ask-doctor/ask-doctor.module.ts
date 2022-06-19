import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskDoctorRoutingModule } from './ask-doctor-routing.module';
import { AskDoctorComponent } from './ask-doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AskDoctorComponent
  ],
  imports: [
    CommonModule,
    AskDoctorRoutingModule,
    SharedModule
  ]
})
export class AskDoctorModule { }
