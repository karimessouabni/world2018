import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WorldCupProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  videos: any;
  constructor(private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    this.videos = worldCupProvider.getWorldCupVideos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }


  compilemsg(index):string{
    return index.concat(" \n Sent from WC2018 !");
  }
    
  regularShare(index){
    var msg = this.compilemsg(index);
    this.socialSharing.share(msg, null, null, null);
  }


}
