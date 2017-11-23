import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome'
import { Sheet } from '../../models/Sheet';
import { Cote } from '../../models/Cote';
import { Element } from '../../models/Element';
import { Bet3Sheets } from '../../models/bet3Sheets';
import { Player } from '../../models/PlayerModel/Player';
import firebase from 'firebase/app';


import { PlayerProvider } from '../../providers/player/player';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the BilanBetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilan-bet',
  templateUrl: 'bilan-bet.html',
})
export class BilanBetPage {
  fixture: any;
  playedElementsIn3Sheets: Bet3Sheets;
  showStyle: false;
  selectedCote: Map<number, any> = new Map();
  bet3Sheets: Bet3Sheets;
  solde: Number = 0;
  player: Player = new Player();

  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, afAuth: AngularFireAuth) {



    this.bet3Sheets = navParams.get('playedSheets');
    this.playedElementsIn3Sheets = new Bet3Sheets();
    this.fillListPlayedElement();

    // this.playerProvider.getAuthPlayerInfs().subscribe(BDplayer => {
    //       this.player.silverCoins = BDplayer[0].silverCoins;
    //       console.log("testing" + BDplayer[0].email);
    //     });
    playerProvider.getAuthPlayerInfs().subscribe(user => {
      if (user) {
        this.player = user[0];
        console.log("testing FireStore BD" + user[0]);
      } else {
        // if the user is unloged redirection to welcom page 
        this.navCtrl.push(WelcomePage);
      }

    });
    // this.player = playerProvider.playerConnected;
    // console.log("Test in Bilan Bet " + this.player);
  }



  public fillListPlayedElement() {
    for (var i = 0; i < this.bet3Sheets.sheetAllMatch.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(this.bet3Sheets.sheetAllMatch.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheetAllMatch.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheetAllMatch.elementsList[i].title);
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(el);
      }
    }
    for (var i = 0; i < this.bet3Sheets.sheet145.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet145.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet145.elementsList.push(this.bet3Sheets.sheet145.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet145.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet145.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheet145.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet145.elementsList.push(el);
      }
    }
    for (var i = 0; i < this.bet3Sheets.sheet245.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet245.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet245.elementsList.push(this.bet3Sheets.sheet245.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet245.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet245.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheet245.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet245.elementsList.push(el);
      }
    }

  }


  getCurrentUserAndGo() {

    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref().child('accounts').child(uid).set({
      age: 22,
      sexe: 'M'
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BilanBetPage');
  }

}
