import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurgeryDetailsComponent } from './surgery-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id',
        component: SurgeryDetailsComponent
      }
    ]
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurgeryDetailsRoutingModule { }
