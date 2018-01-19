import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage} from '../pages'

import { Player } from '../../models/Models';

import { PlayerProvider } from '../../providers/providers';
/**
 * Generated class for the Bilan2PlayersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilan2-players',
  templateUrl: 'bilan2-players.html',
})
export class Bilan2PlayersPage {
  fixture: any;
  player: Player = new Player();

  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider) {
    this.fixture = navParams.get('fixture');
    playerProvider.getAuthPlayerInfs().subscribe(user => {
      if (user) {
        this.player = user[0];
      } else {
        // if the user is unloged redirection to welcom page 
        this.navCtrl.push(WelcomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Bilan2PlayersPage');
  }

}
