import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';



import { MyApp } from './app.component';


import { ItemCreatePage } from '../pages/item-create/item-create';
import { HomeBetPage } from '../pages/home-bet/home-bet';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { GroupesPage } from '../pages/groupes/groupes';
import { NewsPage } from '../pages/news/news';
import { VideosPage } from '../pages/videos/videos';
import { TopPlayersPage } from '../pages/top-players/top-players';
import { WcNewsPage } from '../pages/news/wc-news';
import { WcVideosPage } from '../pages/wc-videos/wc-videos';
import { WcTablesPage } from '../pages/wc-tables/wc-tables';


import { ListMasterPage, TabsPage } from '../pages/pages';

//TO REMOVE 
import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { ReviewsProvider } from '../providers/reviews/reviews';
//TO REMOVE

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePicker } from 'ionic2-date-picker';
import { CalendarModule } from "ion2-calendar";
import { SuperTabsModule } from "ionic2-super-tabs";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Facebook } from '@ionic-native/facebook'; //Added Facebook


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Providers 
import { CompetitionProvider, Bet3SheetsProvider, PlayerProvider, TeamsProvider, GameProvider } from '../providers/providers';

// Pipes 
import { KeysPipe } from '../pages/home-bet/compet.pipes'
import { DatePipes } from '../pipes/date-pipes/date-pipes'; // import our pipe here
import { TeamNamePipe } from '../pipes/team-name/team-name';

//Model 
import { Bet3Sheets } from '../models/bet3Sheets';

//External Config 

import { WorldCupProvider } from '../providers/world-cup/world-cup';



// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello',
    option5: 'karimou'
  });
} 



@NgModule({
  declarations: [
    MyApp,
    ItemCreatePage,
    HomeBetPage,
    ListMasterPage,
    TabsPage,
    TutorialPage,
    KeysPipe,
    DatePipes,
    TeamNamePipe,
    DatePicker,
    GroupesPage,
    NewsPage,
    VideosPage,
    TopPlayersPage,
    WcNewsPage,
    WcVideosPage,
    WcTablesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
    BrowserAnimationsModule,
    SuperTabsModule.forRoot(),
    LazyLoadImageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DatePicker,
    MyApp,
    ItemCreatePage,
    HomeBetPage,
    ListMasterPage,
    TabsPage,
    TutorialPage,
    GroupesPage,
    NewsPage,
    VideosPage,
    TopPlayersPage,
    WcNewsPage,
    WcVideosPage,
    WcTablesPage  
  ],
  providers: [
    Api,
    ReviewsProvider,
    InAppBrowser,
    SocialSharing,
    CompetitionProvider,
    Items,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    TeamNamePipe,
    Bet3Sheets,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    CompetitionProvider,
    TeamsProvider,
    Facebook,
    Bet3SheetsProvider,
    PlayerProvider,
    GameProvider,
    WorldCupProvider
  ]
})
export class AppModule { }
