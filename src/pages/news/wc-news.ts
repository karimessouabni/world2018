import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorldCupProvider } from '../../providers/providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the WcNewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class WcNewsPage {
  news: any;
  header = true;

  constructor(private socialSharing: SocialSharing, public iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    worldCupProvider.getWorldCupNews().then(data => {
      this.news = data;
    });
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad WcNewsPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.worldCupProvider.getWorldCupNews().then(data => {
      this.news = data;
      refresher.complete();
    });
  }

}
