import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorldCupProvider } from '../../providers/providers';
/**
 * Generated class for the GroupesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupes',
  templateUrl: 'groupes.html',
})
export class GroupesPage {
  groupe: any;
  groupeName: any;
  fixture: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    this.fixture = navParams.data;
    worldCupProvider.getGroupOfTeam(this.fixture.homeTeamName).then(group =>{
      this.groupeName = group;
      worldCupProvider.getWorldCupTable(group).then(data => {
        this.groupe = data;
      });
    });
  }

  ionViewDidLoad() {

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.worldCupProvider.getGroupOfTeam(this.fixture.homeTeamName).then(group =>{
      this.groupeName = group;
      this.worldCupProvider.getWorldCupTable(group).then(data => {
        this.groupe = data;
      });
      refresher.complete();
    });
      
  }
}
