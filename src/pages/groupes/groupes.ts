import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WorldCupProvider} from '../../providers/providers';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public worldCupProvider : WorldCupProvider) {
  }

  ionViewDidLoad() {
    let myobject = this.worldCupProvider.getWorldCupTable('A');
    console.log('ionViewDidLoad GroupesPage');
  }

}
