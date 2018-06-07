import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WcVideosPage } from './wc-videos';

@NgModule({
  declarations: [
    WcVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(WcVideosPage),
  ],
})
export class WcVideosPageModule {}
