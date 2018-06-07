import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Items } from '../../providers/providers';
import { CompetitionProvider } from '../../providers/competition/competition';
import { TeamsProvider } from '../../providers/teams/teams';
import { GroupesPage } from '../groupes/groupes';
import { NewsPage } from '../news/news';
import { VideosPage } from '../videos/videos';
import { Bet3Sheets } from '../../models/bet3Sheets';
import { Sheet } from '../../models/Sheet';
import { Element } from '../../models/Element';
import { Cote } from '../../models/Cote';
import { TeamNamePipe } from '../../pipes/team-name/team-name';
import { Events } from 'ionic-angular';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home-bet',
  templateUrl: 'home-bet.html',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)' }),
        animate(150)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translate(150px,55px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})

export class HomeBetPage {
  fixture: any;
  matches: any;
  teamImgLink: any;
  pageParis1: any = GroupesPage;
  pageParis2: any = NewsPage;
  pageParis3: any = VideosPage;
  sheet: Sheet;
  bet3Sheets: Bet3Sheets;
  betCount: number;
  sheetFixtureObj: any = null;


  constructor(private socialSharing: SocialSharing, private pipeTeam: TeamNamePipe, public navCtrl: NavController, public competitionsProvider: CompetitionProvider, public teamsProvider: TeamsProvider, navParams: NavParams, items: Items, public events: Events, public toastCtrl: ToastController) {

    this.fixture = navParams.get('fixture');
    // this.betCount = this.bet3Sheets.sheetAllMatch.player;
    this.events.subscribe('functionCall:tabSelected', eventData => {
      this.betCount = eventData.betCount;
    });

  }

  
  onTabSelect(ev: any) {
    if (ev.index == 3)
      this.sheetFixtureObj = { bet3sheets: this.bet3Sheets, fixture: this.fixture };
    // this.BilanPage.fillListPlayedElement();
  }



  
  regularShare(){
    this.socialSharing.share("Sent from the best App for World Cup 2018 : \nWC2018! ", null, null, null);
  }





}
