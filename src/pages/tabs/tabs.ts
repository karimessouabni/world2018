import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import {  ListMasterPage } from '../pages';
import {TopPlayersPage} from '../top-players/top-players';
import {WcNewsPage} from '../wc-news/wc-news';
import {WcVideosPage} from '../wc-videos/wc-videos';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = ListMasterPage;
  tab2Root: any = WcVideosPage;
  tab3Root: any = WcNewsPage;
  tab2: any = TopPlayersPage;

  tab1Title = "Table";
  tab2Title = "Videos";
  tab3Title = "News";
  tab4Title = "Players";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
   
  }

  
}
