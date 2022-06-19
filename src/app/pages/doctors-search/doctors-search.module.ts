import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsSearchRoutingModule } from './doctors-search-routing.module';
import { DoctorsSearchComponent } from './doctors-search.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DoctorsSearchComponent
  ],
  imports: [
    CommonModule,
    DoctorsSearchRoutingModule,
    SharedModule
  ]
})
export class DoctorsSearchModule { }
