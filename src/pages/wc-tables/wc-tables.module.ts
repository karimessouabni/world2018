import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WcTablesPage } from './wc-tables';

@NgModule({
  declarations: [
    WcTablesPage,
  ],
  imports: [
    IonicPageModule.forChild(WcTablesPage),
  ],
})
export class WcTablesPageModule {}
