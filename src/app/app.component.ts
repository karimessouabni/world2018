import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage } from '../pages/pages';
import { ListMasterPage } from '../pages/list-master/list-master';
import { TabsPage } from '../pages/tabs/tabs';
import { TopPlayersPage } from '../pages/top-players/top-players';

import { TutorialPage } from '../pages/tutorial/tutorial';


import { Settings } from '../providers/providers';



@Component({
  template: `<ion-menu [content]="content">
    <ion-header classe="header1">
      <ion-toolbar>
      <ion-title>
      <ion-row>  
      <ion-col>
        <ion-avatar>
           <img style ="height: 50px;margin-left: 54px;
            width: 40px;"src="assets/img/trophy.png"/>
        </ion-avatar>
        </ion-col>
        <ion-col>
      
          <p style ="margin-right: 42px;" class="titles1">WC2018</p>
                
        </ion-col>
      </ion-row>
    </ion-title>
        
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  // rootPage : any = FirstRunPage;
  rootPage: any;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Table', component: TabsPage },
    { title: 'Videos', component: ListMasterPage },
    { title: 'News', component: ListMasterPage },
    { title: 'Players', component: TopPlayersPage },
  ]

  constructor(private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {

    this.rootPage = TabsPage;
    // this.rootPage = FirstRunPage;

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
