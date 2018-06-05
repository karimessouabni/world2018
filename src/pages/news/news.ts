import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorldCupProvider } from '../../providers/providers';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  fixture: any;
  news: any;
  constructor(private socialSharing: SocialSharing, public iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public worldCupProvider: WorldCupProvider) {
    this.fixture = navParams.data;
    worldCupProvider.getWorldCupNewsForTeam(this.fixture.homeTeamName).then(data =>{
      this.news = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  openUrl(url: any) {
    const browser = this.iab.create(url);
    browser.show();
  }

  compilemsg(index):string{
    return index.concat(" \n Sent from WC2018 !");
  }
  
  regularShare(index){
    var msg = this.compilemsg(index);
    this.socialSharing.share(msg, null, null, null);
  }

}
