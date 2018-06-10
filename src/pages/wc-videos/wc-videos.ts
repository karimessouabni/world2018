import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WorldCupProvider } from '../../providers/providers';

/**
 * Generated class for the WcVideosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wc-videos',
  templateUrl: 'wc-videos.html',
})
export class WcVideosPage {
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
  