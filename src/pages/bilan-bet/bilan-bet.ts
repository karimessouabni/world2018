import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { WelcomePage, Bilan2PlayersPage } from '../pages'


// Importing nedded Models 
import { Cote, Element, Sheet, Bet3Sheets, Player, GameFvsF } from '../../models/Models';
import * as firebase from 'firebase';



import { PlayerProvider, GameProvider, RetourPendingGame } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { GameType } from '../../models/Game';



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
  playinOnline: any = false;
  playedElementsIn3Sheets = {} as Bet3Sheets;
  showStyle: false;
  selectedCote: Map<number, any> = new Map();
  bet3Sheets = {} as Bet3Sheets;
  solde: number = 0;
  wins: number = 0;
  player: Player = new Player();
  gameToFS = {} as GameFvsF;



  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, public gameProvider: GameProvider, afAuth: AngularFireAuth, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
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
    this.playedElementsIn3Sheets.playerUid = this.player.uid;
    for (let i = 0; i < this.bet3Sheets.sheetAllMatch.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(this.bet3Sheets.sheetAllMatch.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        let coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheetAllMatch.elementsList[i].getPlayedCote());
        let el = new Element(coteTab, this.bet3Sheets.sheetAllMatch.elementsList[i].title);
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(el);
      }
    }
    for (let i = 0; i < this.bet3Sheets.sheet145.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet145.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet145.elementsList.push(this.bet3Sheets.sheet145.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet145.elementsList[i].played == true) {
        let coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet145.elementsList[i].getPlayedCote());
        let el = new Element(coteTab, this.bet3Sheets.sheet145.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet145.elementsList.push(el);
      }
    }
    for (let i = 0; i < this.bet3Sheets.sheet245.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet245.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet245.elementsList.push(this.bet3Sheets.sheet245.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet245.elementsList[i].played == true) {
        let coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet245.elementsList[i].getPlayedCote());
        let el = new Element(coteTab, this.bet3Sheets.sheet245.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet245.elementsList.push(el);
      }
    }

  }




  playBetWithStranger() {
    let toast = this.toastCtrl.create({
      message: "Match déjà en cours !",
      duration: 3000,
      position: 'top'
    });
    if (this.fixture.status != "SCHEDULED" && this.fixture.status != "TIMED") { // to eliminate the case the user open this page waiting for the match to start then push his bet
      toast.present();
    }
    this.gameFSFactory();
    this.gameProvider.checkPendingGames(this.gameToFS, this.solde).then(returnValue => {
      if (returnValue == RetourPendingGame.BetFound2Player || returnValue == RetourPendingGame.BetPendedWithOnePlayer) {
        this.presentLoadingDefault();
        this.navCtrl.push(Bilan2PlayersPage, {
          fixture: this.fixture,
          retourPendingGame: returnValue
        });
      }
      else if (returnValue == RetourPendingGame.BetAlreadyPlayed) {
        this.CantPlayTwiceToast();
      }
      else {
        toast.present();
      }
    }
    );


  }

  

  CantPlayTwiceToast() { 
    let toast = this.toastCtrl.create({
      message: 'You cannot play this twice !',
      duration: 2000,
      position: 'top',
      cssClass: "toastCantPlayTwice"
    });
    toast.present();
  }

  gameFSFactory() {
    this.gameToFS.player1Uid = this.player.uid;
    this.gameToFS.idFixture = this.fixture._id;
    this.gameToFS.sheetBet1 = this.playedElementsIn3Sheets;
    this.gameToFS.sheetBet1.playerUid = this.player.uid;
    this.gameToFS.typeGame = GameType.strangerVsStranger;
    this.gameToFS.sheetBet1.betCount = this.wins;
  }



  getwiningBet() {
    this.wins = this.playedElementsIn3Sheets.getSumToWin(this.solde);
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Seeking for opponent...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BilanBetPage');
  }

}
