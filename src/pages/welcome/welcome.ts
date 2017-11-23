import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import firebase from 'firebase';


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

  constructor(public navCtrl: NavController) { 

  }

  login() {
    this.navCtrl.push(LoginPage, {});
  }

  async loginFB() {
    console.log("lklkl");
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then( ()=>{
      firebase.auth().getRedirectResult().then((result) =>{
        alert(JSON.stringify(result));
        console.log(result);
      }).catch(function(error){
        alert(JSON.stringify(error));
        console.log(error);
      })
    }
      
    )
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
