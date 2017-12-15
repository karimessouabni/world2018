import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome'


// Importing nedded Models 
import { Cote, Element, Sheet, Bet3Sheets, Player } from '../../models/Models';
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
  playinOnline: any=false;
  playedElementsIn3Sheets: Bet3Sheets;
  showStyle: false;
  selectedCote: Map<number, any> = new Map();
  bet3Sheets: Bet3Sheets;
  solde: number = 0;
  wins: number = 0;
  player: Player = new Player();

  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, afAuth: AngularFireAuth) {
    this.bet3Sheets = navParams.get('playedSheets');
    this.fixture = navParams.get('fixture');
    this.playinOnline = navParams.get('online');
    this.playedElementsIn3Sheets = new Bet3Sheets();
    this.fillListPlayedElement();
    playerProvider.getAuthPlayerInfs().subscribe(user => {
      if (user) {
        this.player = user[0];
      } else {
        // if the user is unloged redirection to welcom page 
        this.navCtrl.push(WelcomePage);
      }
    });

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


  getwiningBet() {
   this.wins = this.playedElementsIn3Sheets.getSumToWin(this.solde);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BilanBetPage');
  }

}
