import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskDoctorComponent } from './ask-doctor.component';

const routes: Routes = [
  {
    path: '',
    component: AskDoctorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AskDoctorRoutingModule { }
