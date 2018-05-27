import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBetsPage } from './my-bets';

@NgModule({
  declarations: [
    MyBetsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBetsPage),
  ],
})
export class MyBetsPageModule {}
