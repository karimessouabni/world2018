import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MainPage } from '../../pages/pages';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { Player } from '../../models/PlayerModel/Player';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { PlayerProvider } from '../../providers/player/player';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  loginForm: FormGroup;
  logedPlayer = {} as Player;
  resetPasswordPage = ResetPasswordPage //Added reset password page
  


  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService, private fb: FormBuilder, public auth: AuthProvider, private playerProvider: PlayerProvider) {

    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    })
    

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  async login() {
    if (this.loginForm.valid) {
      this.logedPlayer.email = this.loginForm.controls['email'].value;
      this.logedPlayer.password = this.loginForm.controls['password'].value;
      var credentials = ({ email: this.logedPlayer.email, password: this.logedPlayer.password }); //Added next lines
      this.auth.loginWithEmail(credentials).subscribe(data => {
          // once the user is logged in to fireBseAuth we WILL NOT pull it informations from the firestoreCloudDB til nedded
          this.playerProvider.getAuthPlayerInfs().subscribe(BDplayer => {
            // this.logedPlayer.silverCoins = BDplayer[0].silverCoins;
            console.log("testing" + BDplayer[0].email);
          });
          let toast = this.toastCtrl.create({
            message: "Vous etes connectés !",
            duration: 4000,
            position: 'top'
          });
          toast.present();
        this.navCtrl.push(MainPage);
      }, error => {             //Added next lines for handling unknown users
        console.log(error);
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        if (error.code == 'auth/user-not-found') {
          alert('User not found');
        }
      });
    }
  }

}
