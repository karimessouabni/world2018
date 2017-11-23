import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MainPage } from '../../pages/pages';
import { Player } from '../../models/PlayerModel/Player';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { PlayerProvider } from '../../providers/player/player';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  signupForm: FormGroup;
  registredPlayer = {} as Player;
  public toastCtrl: ToastController;


  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService, private fb: FormBuilder, private auth: AuthProvider, private playerProvider: PlayerProvider) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.signupForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

  }



  playerFSFactory(uid) {

    this.registredPlayer.uid = uid;
    this.registredPlayer.silverCoins = 200; 
  }


  async doSignup() {
    if (this.signupForm.valid) {
      this.registredPlayer.email = this.signupForm.controls['email'].value;
      this.registredPlayer.password = this.signupForm.controls['password'].value;
      var credentials = ({ email: this.registredPlayer.email, password: this.registredPlayer.password });
      this.auth.registerUser(credentials).subscribe(registerData => {
        console.log(registerData);

        // once the user is regiterd to fireBseAuth we proceed to its regestration on the firestoreCloudDB
        this.playerFSFactory(registerData.uid);
        this.playerProvider.persistAuthPlayerInfs(this.registredPlayer);
        alert('User is registered and logged in.');
        this.navCtrl.setRoot(MainPage);
      }, registerError => {
        console.log(registerError);
        if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use') {
          // alert(registerError.message);
          let toast = this.toastCtrl.create({
            message: registerError.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }


      });
    }
  }


}
