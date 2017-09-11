import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeReviewPage } from './home-review';

@NgModule({
  declarations: [
    HomeReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeReviewPage),
  ],
})
export class HomeReviewPageModule {}
