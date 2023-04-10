import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurgeryDetailsRoutingModule } from './surgery-details-routing.module';
import { SurgeryDetailsComponent } from './surgery-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SurgeryDetailsComponent],
  imports: [
    CommonModule,
    SurgeryDetailsRoutingModule,
    SharedModule
  ]
})
export class SurgeryDetailsModule { }
