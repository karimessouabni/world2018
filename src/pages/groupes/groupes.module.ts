import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupesPage } from './groupes';

@NgModule({
  declarations: [
    GroupesPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupesPage),
  ],
})
export class GroupesPageModule {}
