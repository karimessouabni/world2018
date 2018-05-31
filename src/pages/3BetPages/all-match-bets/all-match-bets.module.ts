import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllMatchBets } from './all-match-bets';

@NgModule({
  declarations: [
    AllMatchBets,
  ],
  imports: [
    IonicPageModule.forChild(AllMatchBets),
  ],
})
export class SheetPageModule {}
