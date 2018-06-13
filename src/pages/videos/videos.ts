import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WorldCupProvider } from '../../providers/providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  videos: any;
  fixture: any;
  constructor(private iab: InAppBrowser, private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    this.fixture = navParams.data;
    worldCupProvider.getWorldCupVideosForTeam(this.fixture.homeTeamName, this.fixture.awayTeamName).then(data => {
      this.videos = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

  openUrl(url: any) {
    const browser = this.iab.create(url);
    browser.show();
  }

  compilemsg(index): string {
    return index.concat(" \n Sent from WC2018 !");
  }

  regularShare(index) {
    var msg = this.compilemsg(index);
    this.socialSharing.share("Video, news and live score : get it from the store : https://play.google.com/store/apps/details?id=com.parisFoot.karimou", null, null, null);
  }


}
