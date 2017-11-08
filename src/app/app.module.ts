import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AddReviewPage } from '../pages/add-review/add-review';
import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { ItemCreatePage } from '../pages/item-create/item-create';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomeReviewPage } from '../pages/home-review/home-review';
import { SheetPage } from '../pages/sheet/sheet';
import { FirstHtBetsPage } from '../pages/first-ht-bets/first-ht-bets';
import { SecondHtBetsPage } from '../pages/second-ht-bets/second-ht-bets';
import { BilanBetPage } from '../pages/bilan-bet/bilan-bet';

import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { ReviewsProvider } from '../providers/reviews/reviews';

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
// import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'


//Providers 
import { CompetitionProvider } from '../providers/competition/competition';
import { AuthProvider } from '../providers/auth/auth';
import { KeysPipe } from '../pages/item-detail/compet.pipes'
import { DatePipes } from '../pipes/date-pipes/date-pipes'; // import our pipe here
import { TeamNamePipe } from '../pipes/team-name/team-name';
import { TeamsProvider } from '../providers/teams/teams';

import { Bet3Sheets } from '../models/bet3Sheets';


//External Config 

import { FireBaseConfig } from './app.firebase.config';


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
    AddReviewPage,
    CardsPage,
    ContentPage,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    HomeReviewPage,
    SheetPage,
    BilanBetPage,
    KeysPipe,
    DatePipes,
    TeamNamePipe,
    DatePicker,
    FirstHtBetsPage,
    SecondHtBetsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CalendarModule,
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
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DatePicker,
    MyApp,
    AddReviewPage,
    CardsPage,
    ContentPage,
    ItemCreatePage,
    ItemDetailPage,
    ListMasterPage,
    LoginPage,
    MapPage,
    MenuPage,
    SearchPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    WelcomePage,
    HomeReviewPage,
    SheetPage,
    FirstHtBetsPage,
    SecondHtBetsPage,
    BilanBetPage
  ],
  providers: [
    Api,
    ReviewsProvider,
    CompetitionProvider,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    TeamNamePipe,
    Bet3Sheets,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CompetitionProvider,
    TeamsProvider,
    AuthProvider
  ]
})
export class AppModule { }
