import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'our-doctors',
    loadChildren: () => import('./pages/doctors-search/doctors-search.module').then(m => m.DoctorsSearchModule)
  },
  {
    path: 'our-hospitals',
    loadChildren: () => import('./pages/network-hospitals/network-hospitals.module').then((m) => m.NetworkHospitalsModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule)
  },
  {
    path: 'ask-doctor',
    loadChildren: () => import('./pages/ask-doctor/ask-doctor.module').then((m) => m.AskDoctorModule)
  },
  {
    path: 'community',
    loadChildren: () => import('./pages/community/community.module').then((m) => m.CommunityModule)
  },
  {
    path: 'admin-page',
    loadChildren: () => import('./pages/admin/layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'blog',
    loadChildren: ()=> import('./pages/blogs/blogs.module').then((m)=> m.BlogsModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/simplify-surgeries/simplify-surgeries.module').then((m) => m.SimplifySurgeriesModule)
  },
  {
    path: ':name',
    loadChildren: () => import('./pages/surgery/surgery-details/surgery-details.module').then(m => m.SurgeryDetailsModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
