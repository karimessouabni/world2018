import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//Model import
import { Sheet } from '../../models/Sheet';
import { Cote } from '../../models/Cote';
import { Element } from '../../models/Element';
import { Bet3Sheets } from '../../models/bet3Sheets';
import { GameFvsF } from '../../models/GameFvsF';

/*
  Generated class for the Bet3SheetsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export enum RetourPendingGame {
  BetPendedWithOnePlayer,
  BetFound2Player,
  BetAlreadyPlayed,
  BetError,
}
@Injectable()
export class GameProvider {

  bet3SheetCollection: AngularFirestoreCollection<Bet3Sheets>;
  bet3Sheets: Observable<Bet3Sheets[]>; // read collection

  gameToFS = {} as GameFvsF;
  the3SheetsPlayedToFS = {} as Bet3Sheets;
  sheetToFS = {} as Sheet;
  elementToFS = {} as Element;
  coteToFS = {} as Cote;
  returnValue: Observable<RetourPendingGame>;



  constructor(private afs: AngularFirestore) {
  }



  checkPendingGames(game: GameFvsF, mise: number) {

    var _this = this;
    return this.afs.collection("games").ref.where("idFixture", "==", game.idFixture)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) { // if there is no game with the same fixture already stored
          // we simply store this game 
          _this.persistOnlineGameP1Pending(game);
          console.log("no game Found ! you are the first to bet on");
          _this.setPlayerCoins(game.player1Uid.toString(), mise);
          return RetourPendingGame.BetPendedWithOnePlayer;
        }
        else {
          var GameChecked: boolean = false;
          querySnapshot.forEach(function (doc) {
            if (doc.data().player1Uid != game.player1Uid && doc.data().player2Uid == undefined && !GameChecked) { // game with player 1 '!=player 2' but no player 2
              console.log("Persisting Player 2");
              _this.setPlayerCoins(game.player1Uid.toString(), mise);
              _this.persistOnlineGameP2Pending(game, doc.id);
              GameChecked = true;
            }
            console.log(doc.id, " => ", doc.data());
          });
          if (!GameChecked) {// player trying to play the same bet Twice !!!! 
            console.log("Batard 1 seule fois slm !");
            return RetourPendingGame.BetAlreadyPlayed;
          } else {
            return RetourPendingGame.BetFound2Player;
          }
        }
      });

  }


  setPlayerCoins(playerUid: string, playedCoins: number) {
    let _this = this;
    _this.afs.collection('players').ref.where("uid", "==", playerUid).get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        const currentCoins = Number(doc.data().silverCoins - playedCoins);
        // update number of coins
        _this.afs.collection('players').doc(doc.id).update({
          silverCoins: currentCoins
        }).then(() => {
          console.log(`nbr of coins updated for player :${playerUid} with ${currentCoins}`);
        }).catch(error => {
          console.log(`error while updating nbr of coins ${error}`);
        });
      });
    }).catch(error => {
      console.log(`error while geting id player to update nbr of coins ${error}`);
    });
  }

  // getReturnedValueAfterPendingGame(): RetourPendingGame {
  //   return this.returnValue;
  // }

  persistOnlineGameP1Pending(game: GameFvsF) {
    this.gameFSFactoryP1Pending(game);
    this.afs.collection('games').add(this.gameToFS).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.persistBet3Sheet(game.sheetBet1, ref.id);
    }).catch(error => {
      console.log(error);
    });
  }

  persistOnlineGameP2Pending(game: GameFvsF, idExistantGame: string) {
    var _this = this;
    this.gameFSFactoryP2Pending(game);
    this.afs.collection('games').doc(idExistantGame).update({
      player2Uid: this.gameToFS.player2Uid
    }).then(function () {
      console.log("Setting the Bet3Sheet for player 2");
      _this.persistBet3Sheet(game.sheetBet1, idExistantGame);
    }).catch(error => {
      console.log(error);
    });
  }

  persistBet3Sheet(bet3Sheets: Bet3Sheets, idElement: string) {

    this.bet3ShetsFSFactory(bet3Sheets);
    this.afs.collection('games').doc(idElement).collection('bet3Sheets').add(this.the3SheetsPlayedToFS).then(ref => {
      console.log('Added document with ID: ', ref.id);
      this.persistSheet(bet3Sheets.sheetAllMatch, ref.id);
      this.persistSheet(bet3Sheets.sheet145, ref.id);
      this.persistSheet(bet3Sheets.sheet245, ref.id);
    }).catch(error => {
      console.log(error);
    });
  }


  persistSheet(sheet: Sheet, idElement: string) {
    this.sheetFSFactory(sheet);
    this.afs.collection('bet3Sheets').doc(idElement).collection('sheets').add(this.sheetToFS).then(ref => {
      console.log('Added document with ID: ', ref.id);
      for (var j = 0; j < sheet.elementsList.length; j++) {
        this.persistElement(sheet.elementsList[j], ref.id);
      }
    }).catch(error => {
      console.log(error);
    });
  }


  persistElement(element: Element, idElement: string) {
    this.elementFSFactory(element);
    this.afs.collection('sheets').doc(idElement).collection('elements').add(this.elementToFS).then(ref => {
      console.log('Added document with ID: ', ref.id);
      for (var j = 0; j < element.cotesList.length; j++) {
        this.persistCote(element.cotesList[j], ref.id);
      }
    }).catch(error => {
      console.log(error);
    });
  }



  persistCote(cote: Cote, idElement: string) {
    this.coteFSFactory(cote);
    this.afs.collection('elements').doc(idElement).collection('cotes').add(this.coteToFS).then(ref => {
      console.log('Added document with ID: ', ref.id);
    }).catch(error => {
      console.log(error);
    });
  }




  getGameByPlayerUID(uid: string) {
    var _this = this;
    return this.afs.collection("games").ref.where("player1Uid", "==", uid)
      .get()
      .then(function (querySnapshot) {

        var myBets: any = [];
        querySnapshot.forEach(function (doc) {
          myBets.push(doc.data());
        });

      });
  }



  gameFSFactoryP2Pending(g: GameFvsF) {
    this.gameToFS.player2Uid = g.player1Uid;
  }



  gameFSFactoryP1Pending(g: GameFvsF) {
    this.gameToFS.player1Uid = g.player1Uid;
    this.gameToFS.idFixture = g.idFixture;
    this.gameToFS.typeGame = g.typeGame;
  }

  bet3ShetsFSFactory(b: Bet3Sheets) {
    this.the3SheetsPlayedToFS.betCount = b.betCount;
    this.the3SheetsPlayedToFS.playerUid = b.playerUid;
  }

  sheetFSFactory(s: Sheet) {
    // this.sheetToFS.result = s.result;
  }

  elementFSFactory(e: Element) {
    this.elementToFS.played = e.played;
    this.elementToFS.result = e.result;
    this.elementToFS.title = e.title;
  }

  coteFSFactory(c: Cote) {
    this.coteToFS.coef = c.coef;
    this.coteToFS.myTitle = c.myTitle;
    this.coteToFS.played = c.played;
    this.coteToFS.result = c.result;
  }



  // getLastBet3Sheet(){
  //   this.bet3SheetCollection = this.afs.collection('bet3Sheets'); //ref()
  // 	this.bet3Sheets = this.bet3SheetCollection.valueChanges()
  // }

}
