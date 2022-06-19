import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { Carousel, CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    CarouselModule,
    NgxYoutubePlayerModule
  ]
})
export class LayoutModule { }
