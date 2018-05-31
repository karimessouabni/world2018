import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BilanBetPage } from '../bilan-bet/bilan-bet';

@Component({
  selector: 'game-type-select',
  templateUrl: 'game-type-select.html'
})
export class GameTypeSelect {
  rootNavCtrl: NavController;
  cardItems: any[];
  mySheetsAndFixturePlayed: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.mySheetsAndFixturePlayed = new Object();
    this.mySheetsAndFixturePlayed = navParams.data;
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.cardItems = [
      {
        name: 'assets/img/linux.png',
        id: '1',
        content: 'Jouer votre feuille en mode paris simple.',
      },
      {
        name: 'assets/img/mastercard.png',
        id: '2',
        content: 'Inviter un amis à vous defier sur ce match.'
      },
      {
        name: 'assets/img/googleScholar.png',
        id: '3',
        content: 'Jouer contre un inconu.'
      }
    ];

  }

  

  openBilanSubmitOnline(id) {
    if (this.mySheetsAndFixturePlayed.bet3sheets.betCount == 0) {
      let toast = this.toastCtrl.create({
        message: "Choose at least one element !",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    // else if (this.fixture.status != "SCHEDULED" && this.fixture.status != "TIMED") { // to eliminate the case the user open this page waiting for the match to start then push his bet
    //   let toast = this.toastCtrl.create({
    //     message: "Match unavailable !",
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // }
    else {
      switch (id) {
        case '1':

          break;

        case '2':

          break;

        case '3':
        
          break;

        default:
          break;
      }
      this.rootNavCtrl.push(BilanBetPage, {
        online: true,
        playedSheets: this.mySheetsAndFixturePlayed.bet3sheets,
        fixture: this.mySheetsAndFixturePlayed.fixture
      });
    }
  }

}
