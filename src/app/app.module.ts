import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';


import { MyApp } from './app.component';
import * as Raven from 'raven-js';
Raven
  .config('https://2bdcb53332114dc0babfaf648d280025@sentry.io/268959')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err.originalError || err);
  }
}
 


import { GameTypeSelect } from '../pages/game-type-select/game-type-select';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { HomeBetPage } from '../pages/home-bet/home-bet';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { FirstHtBetsPage } from '../pages/3BetPages/first-ht-bets/first-ht-bets';
import { SecondHtBetsPage } from '../pages/3BetPages/second-ht-bets/second-ht-bets';
import { BilanBetPage } from '../pages/bilan-bet/bilan-bet';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { GroupesPage } from '../pages/groupes/groupes';
import { NewsPage } from '../pages/news/news';
import { VideosPage } from '../pages/videos/videos';

import { AddFriendsPage, ProfilPage, ListMasterPage, SettingsPage, AllMatchBets, TabsPage, Bilan2PlayersPage } from '../pages/pages';

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
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { Facebook } from '@ionic-native/facebook'; //Added Facebook


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Providers 
import { CompetitionProvider, AuthProvider, Bet3SheetsProvider, PlayerProvider, TeamsProvider, GameProvider } from '../providers/providers';

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

const firebaseConfig = {
  apiKey: "AIzaSyBWsilu-S_dM_bEJ5kfsEdQPxN9ZBPOL28",
  authDomain: "fbloginparisfoot.firebaseapp.com",
  databaseURL: "https://fbloginparisfoot.firebaseio.com",
  projectId: "fbloginparisfoot",
  storageBucket: "fbloginparisfoot.appspot.com",
  messagingSenderId: "513895090448"
};

@NgModule({
  declarations: [
    MyApp,
    GameTypeSelect,
    ItemCreatePage,
    HomeBetPage,
    ListMasterPage,
    LoginPage,
    MenuPage,
    ResetPasswordPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    AllMatchBets,
    BilanBetPage,
    KeysPipe,
    DatePipes,
    TeamNamePipe,
    DatePicker,
    FirstHtBetsPage,
    SecondHtBetsPage,
    ProfilPage,
    AddFriendsPage,
    Bilan2PlayersPage,
    GroupesPage,
    NewsPage,
    VideosPage
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DatePicker,
    MyApp,
    GameTypeSelect,
    ItemCreatePage,
    HomeBetPage,
    ListMasterPage,
    LoginPage,
    MenuPage,
    ResetPasswordPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    AllMatchBets,
    FirstHtBetsPage,
    SecondHtBetsPage,
    BilanBetPage,
    ProfilPage,
    AddFriendsPage,
    Bilan2PlayersPage,
    GroupesPage,
    VideosPage,
    NewsPage
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
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    CompetitionProvider,
    TeamsProvider,
    AuthProvider,
    Facebook,
    Bet3SheetsProvider,
    PlayerProvider,
    GameProvider,
    WorldCupProvider
  ]
})
export class AppModule { }
