import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { CompetitionProvider } from '../../providers/competition/competition';
import { TeamsProvider } from '../../providers/teams/teams';
import { SuperTabsModule } from 'ionic2-super-tabs'
import { ItemCreatePage } from '../item-create/item-create';
import { SheetPage } from '../sheet/sheet';
import { FirstHtBetsPage } from '../first-ht-bets/first-ht-bets';
import { SecondHtBetsPage } from '../second-ht-bets/second-ht-bets';



@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})


export class ItemDetailPage {
  fixture: any;
  matches: any;
  teamImgLink: any;
  pageParis1: any = SheetPage;
  pageParis2: any = FirstHtBetsPage;
  pageParis3: any = SecondHtBetsPage;

  constructor(public navCtrl: NavController, public competitionsProvider: CompetitionProvider, public teamsProvider: TeamsProvider, navParams: NavParams, items: Items) {

    this.fixture = navParams.get('fixture');
    this.competitionsProvider.getCompetitionLastMatches(this.fixture.idCompet)
      .then(data => {
        this.matches = data;
      });
  }

  ionViewDidLoad() {

  }

  getLinkTeamImg(linkToApi: any) {
    this.teamImgLink = this.teamsProvider.getTeamImg(linkToApi);
  }


  swipeEvent(e) {
    if (e.direction == '2') {
      this.navCtrl.parent.select(2);
    }
    else if (e.direction == '4') {
      this.navCtrl.parent.select(0);
    }
  }

}
