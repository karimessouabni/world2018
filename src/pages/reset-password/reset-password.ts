import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Player } from '../../models/PlayerModel/Player';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';


/**
 * Generated class for the ResetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetPasswordForm: FormGroup;
  player = {} as Player;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public auth: AuthProvider) {
    this.resetPasswordForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])]
    });
  }

  async resetPswd() {
    if (this.resetPasswordForm.valid) {
      this.player.email = this.resetPasswordForm.controls['email'].value;
      this.auth.resetPassword(this.player.email.toString()).subscribe(registerData => {
        alert('Password recovery link is sent.');
        this.navCtrl.setRoot(LoginPage);
      }, registerError => {
        console.log(registerError);
        if (registerError.code === 'auth/user-not-found') {
          alert(registerError.message);
        }
      });

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
