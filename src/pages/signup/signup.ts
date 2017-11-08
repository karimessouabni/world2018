import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MainPage } from '../../pages/pages';
import { Player } from '../../models/PlayerModel/Player';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  signupForm: FormGroup;
  player = {} as Player;
  public toastCtrl: ToastController;


  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController, public translateService: TranslateService, private fb: FormBuilder, private auth: AuthProvider) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    this.signupForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }


  async doSignup() {
    if(this.signupForm.valid) {
      this.player.email = this.signupForm.controls['email'].value;
      this.player.password = this.signupForm.controls['password'].value;
      var credentials = ({email: this.player.email, password: this.player.password});
      this.auth.registerUser(credentials).subscribe(registerData => {
          console.log(registerData);
          alert('User is registered and logged in.');
          this.navCtrl.setRoot(MainPage);
      }, registerError => {
        console.log(registerError);
        if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
        {
          alert(registerError.message);
        }
        // let toast = this.toastCtrl.create({
        //   message: registerError,
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();

      });
  }
} 


}
