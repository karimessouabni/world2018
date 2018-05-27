import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlayerProvider, GameProvider, RetourPendingGame } from '../../providers/providers';

import { Player } from '../../models/Models';
import { WelcomePage} from '../pages'
/**
 * Generated class for the MyBetsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bets',
  templateUrl: 'my-bets.html',
})
export class MyBetsPage {

  player: Player = new Player();
  constructor(public navCtrl: NavController, public playerProvider: PlayerProvider, public navParams: NavParams) {
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
    console.log('ionViewDidLoad MyBetsPage');
  }

}
