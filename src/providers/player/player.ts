import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
//Model import

import { Player } from '../../models/PlayerModel/Player';


/*
  Generated class for the Bet3SheetsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlayerProvider {

  playerCollection: AngularFirestoreCollection<Player>;
  player: Observable<Player>; // read Object player
  playerConnected: Player;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  getAuthPlayerInfs() {
    return this.afAuth.authState.switchMap(auth => {
      return (auth != null) ? this.afs.collection('players', ref => ref.where('uid', '==', auth.uid)).valueChanges() : Observable.of(null);
    });
  }


  persistAuthPlayerInfs(playerData: Player) {
    this.afs.collection('players').add(playerData).then(ref => {
      console.log('Added document with ID: ', ref.id);
    }).catch(error => {
      console.log(error);
    });

  }



}
