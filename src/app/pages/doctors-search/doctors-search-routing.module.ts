import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from 'src/app/shared/components/doctor-details/doctor-details.component';
import { DoctorsSearchComponent } from './doctors-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DoctorsSearchComponent,
      },
      {
        path: ':docId',
        component: DoctorDetailsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsSearchRoutingModule { }
