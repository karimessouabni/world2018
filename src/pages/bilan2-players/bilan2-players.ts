import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixture = navParams.get('fixture');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Bilan2PlayersPage');
  }

}
