import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//Model import
import { Bet3Sheets } from '../../models/bet3Sheets';


/*
  Generated class for the Bet3SheetsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Bet3SheetsProvider {

  bet3SheetCollection: AngularFirestoreCollection<Bet3Sheets>;
  bet3Sheets: Observable<Bet3Sheets[]>; // read collection

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
  }


  getLastBet3Sheet(){
    this.bet3SheetCollection = this.afs.collection('bet3Sheets'); //ref()
  	this.bet3Sheets = this.bet3SheetCollection.valueChanges()
  }

}
