import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkHospitalsRoutingModule } from './network-hospitals-routing.module';
import { NetworkHospitalsComponent } from './network-hospitals.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    NetworkHospitalsComponent
  ],
  imports: [
    CommonModule,
    NetworkHospitalsRoutingModule,
    SharedModule
  ]
})
export class NetworkHospitalsModule { }
