import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import {CompetitionProvider} from '../../providers/competition/competition';
import {TeamsProvider} from '../../providers/teams/teams';




@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})


export class ItemDetailPage {
  item : any;
  matches : any;
  teamImgLink : any;

  constructor(public navCtrl: NavController, public competitionsProvider: CompetitionProvider, public teamsProvider: TeamsProvider, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
    this.competitionsProvider.getPrimeraDivisionLastMatches()
    .then(data => { 
      this.matches =  data ;
    });
  }


  getLinkTeamImg(linkToApi : any){
    this.teamImgLink  = this.teamsProvider.getTeamImg(linkToApi);

  }

}
