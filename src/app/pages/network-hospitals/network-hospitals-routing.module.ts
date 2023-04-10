import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkHospitalsComponent } from './network-hospitals.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkHospitalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkHospitalsRoutingModule { }
