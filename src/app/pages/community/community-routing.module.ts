import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityDetailComponent } from './community-detail/community-detail.component';
import { CommunityComponent } from './community.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CommunityComponent
      },
      {
        path: ':id',
        component: CommunityDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
