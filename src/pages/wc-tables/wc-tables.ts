import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorldCupProvider } from '../../providers/providers';
/**
 * Generated class for the WcTablesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wc-tables',
  templateUrl: 'wc-tables.html',
})
export class WcTablesPage {

  groups: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    let str = "ABCDEFGH";
    for (var i = 0; i < str.length; i++) {
      this.worldCupProvider.getWorldCupTable(str.charAt(i)).then(groupe => {

        this.groups.push(groupe);

      });
    }

  }
  ionViewDidLoad() {

  }

}
