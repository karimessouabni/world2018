import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WcNewsPage } from './wc-news';

@NgModule({
  declarations: [
    WcNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(WcNewsPage),
  ],
})
export class WcNewsPageModule {}
