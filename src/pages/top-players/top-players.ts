import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorldCupProvider } from '../../providers/providers'
/**
 * Generated class for the TopPlayersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-players',
  templateUrl: 'top-players.html',
})
export class TopPlayersPage {

  players: any;
  constructor(public wcProvider: WorldCupProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.wcProvider.getWorldCuptopPlayers().then(data => {
      this.players = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopPlayersPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.wcProvider.getWorldCuptopPlayers().then(data => {
      this.players = data;
      refresher.complete();
    });

  }

}
