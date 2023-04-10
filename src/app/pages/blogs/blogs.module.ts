import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule
  ]
})
export class BlogsModule { }
