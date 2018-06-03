import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilanBetPage } from './bilan-bet';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [
    BilanBetPage,
  ],
  imports: [
    IonicPageModule.forChild(BilanBetPage),
    CommonModule]
})
export class BilanBetPageModule {}
