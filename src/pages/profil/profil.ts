import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { WelcomePage } from '../welcome/welcome'

import { Player } from '../../models/Models';
import { PlayerProvider } from '../../providers/player/player';



@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  player: Player = new Player();
  bigImg = null;
  bigSize = '0';
  smallImg = null;
  smallSize = '0';


  constructor(public navCtrl: NavController, public navParams: NavParams, public playerProvider: PlayerProvider, afAuth: AngularFireAuth, private camera: Camera) {
    playerProvider.getAuthPlayerInfs().subscribe(user => {
      if (user) {
        this.player = user[0];
      } else {
        // if the user is unloged redirection to welcome page 
        this.navCtrl.push(WelcomePage);
      }
    });

  }


  loadImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: false
    };

    this.camera.getPicture(options).then(imageData => {
      let base64data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64data;
      this.bigSize = this.getImageSize(this.bigImg);
    }, err => {
      console.log('gallery error: ', err);
    });
  }


  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024 * 1024)).toFixed(4);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
