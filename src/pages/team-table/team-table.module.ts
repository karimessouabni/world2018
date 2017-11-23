import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamTablePage } from './team-table';

@NgModule({
  declarations: [
    TeamTablePage,
  ],
  imports: [
    IonicPageModule.forChild(TeamTablePage),
  ],
})
export class TeamTablePageModule {}
