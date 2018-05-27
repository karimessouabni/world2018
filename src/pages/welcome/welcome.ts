import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook'


/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public userProfile:any = null;

  constructor(public navCtrl: NavController, public facebook: Facebook) { 

  }

  login() {
    this.navCtrl.push(LoginPage, {});
  }


  // facebookLogin(): Promise<any> {
  //   return this.facebook.login(['email'])
  //     .then( response => {
          
  //       const facebookCredential = firebase.auth.FacebookAuthProvider
  //         .credential(response.authResponse.accessToken);
  
  //       firebase.auth().signInWithCredential(facebookCredential)
  //         .then( success => { 
  //           console.log("Firebase success: " + JSON.stringify(success)); 
  //         });
  //     }).catch((error) => { console.log(error) });
  // }

  
  async facebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
          console.log(error);
    
    // ...
  });
}


  // async loginFB() {
  //   console.log("lklkl");
  //   let provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithRedirect(provider).then( ()=>{
  //     firebase.auth().getRedirectResult().then((result) =>{
  //       alert(JSON.stringify(result));
  //       console.log(result);
  //     }).catch(function(error){
  //       alert(JSON.stringify(error));
  //       console.log(error);
  //     })
  //   }
      
  //   )
  // }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
