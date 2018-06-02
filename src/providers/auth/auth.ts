import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth) {
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password
      ).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
        //this.af.auth.currentUser.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
        observer.next(authData);
      }).catch(error => {
        //console.log(error);
        observer.error(error);
      });
    });
  }

  resetPassword(emailAddress:string){
    return Observable.create(observer => {
      this.af.auth.sendPasswordResetEmail(emailAddress).then(function(success) {
          console.log('email sent', success);
          observer.next(success);
        }, function(error) {
          console.log('error sending email',error);
          observer.error(error);
        });
     });
  }

  logout() {
    this.af.auth.signOut();
  }

  get currentUser(): string {
    return this.af.auth.currentUser ? this.af.auth.currentUser.email : null;
  }
} 
