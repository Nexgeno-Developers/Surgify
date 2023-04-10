import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimplifySurgeriesComponent } from './simplify-surgeries.component';

const routes: Routes = [
  {
    path: '',
    component: SimplifySurgeriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplifySurgeriesRoutingModule { }
