import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimplifySurgeriesRoutingModule } from './simplify-surgeries-routing.module';
import { SimplifySurgeriesComponent } from './simplify-surgeries.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SimplifySurgeriesComponent
  ],
  imports: [
    CommonModule,
    SimplifySurgeriesRoutingModule,
    SharedModule
  ]
})
export class SimplifySurgeriesModule { }
