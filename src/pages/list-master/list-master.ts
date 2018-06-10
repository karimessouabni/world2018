import { Component } from '@angular/core';
import * as moment from 'moment';
import { NavController, ModalController, ToastController, MenuController } from 'ionic-angular';
import { HomeBetPage } from '../home-bet/home-bet';
import { Items } from '../../providers/providers';
import { CompetitionProvider } from '../../providers/competition/competition';
import { Item } from '../../models/item';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";


@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  allCompets: any;
  fixtureOfCompetAday: any;
  selectedDate: any;
  FixtureByCompet: { [key: string]: any; } = {};
  allCompetUpdated = [];
  now: any;
  dateEntete: any;
  nothing: any = false;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public items: Items, public competitionsProvider: CompetitionProvider, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.now = moment();
    this.updateSelectedDate();
    this.updateListFixtureAndCompets();
  }

  openSideMenu() {
    this.menuCtrl.toggle('left')
  }

  updateListFixtureAndCompets() {
    this.allCompetUpdated = [];
    this.competitionsProvider.getCompetitions2017()
      .then(dataCompet => {
        if (dataCompet == null) {
          this.nothing = true;
        }
        this.allCompets = dataCompet;
        dataCompet.forEach(compet => { // pour chaque competition : PrimeraDivision
          this.competitionsProvider.getFixturesByDayAndCompet(this.selectedDate, compet.league)
            .then(dataFixtures => { // match du jours : PrimeraDivision's Matchs of today 
              dataFixtures.forEach(fixture => {

                this.competitionsProvider.getTeamsById(fixture["idHomeTeam"])
                  .then(dataTeam => {
                    fixture['urlhomeTeam'] = dataTeam['crestUrl'] ? dataTeam['crestUrl'] : "assets/img/International-flags/" + dataTeam['name'].replace(/\s/g, '') + ".png";

                    this.competitionsProvider.getTeamsById(fixture["idAwayTeam"])
                      .then(dataTeam2 => {
                        fixture['urlawayTeam'] = dataTeam2['crestUrl'] ? dataTeam2['crestUrl'] : "assets/img/International-flags/" + dataTeam2['name'].replace(/\s/g, '') + ".png";

                      });

                  });


              });
              this.FixtureByCompet[compet.league] = dataFixtures;
              if (this.FixtureByCompet[compet.league].length > 0) {
                this.addCompet(compet.league);
              }

            });
        });

      });


  }


  addCompet(league: any) {
    this.allCompets.forEach(compet => {
      if (compet.league === league)
        this.allCompetUpdated.push(compet);

    });
  }

  updateSelectedDate() { //format example : 2018-06-15
    if (this.now.format('DD') < "14" && this.now.format('MM') === "06") {
      this.selectedDate = '2018-06-14';
      this.dateEntete = '14 JUN';
    }
    else {
      this.selectedDate = this.now.format('YYYY-MM-DD');
      this.dateEntete = this.now.format('DD MMM');
    }
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  /**
   * Navigate to the detail page for this item.
   */

  openCompet(fixture: any) {
    if (fixture.status == "SCHEDULED" || fixture.status == "TIMED") {
      this.navCtrl.push(HomeBetPage, {
        fixture: fixture
      });
    } else {
      let toast = this.toastCtrl.create({
        message: "Impossible de parier sur les matches passés !",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }


  dayNext() {
    let momentDate = moment(this.selectedDate, "YYYY-MM-DD").add(1, 'days');
    this.selectedDate = momentDate.format('YYYY-MM-DD');
    this.dateEntete = momentDate.format('DD MMM');
    this.updateListFixtureAndCompets();
  }

  dayBefore() {
    let momentDate = moment(this.selectedDate, "YYYY-MM-DD").subtract(1, 'days');
    this.selectedDate = momentDate.format('YYYY-MM-DD');
    this.dateEntete = momentDate.format('DD MMM');
    this.updateListFixtureAndCompets();
  }

  openCalendar() {

    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig.push({
        date: new Date(2017, 8, i + 1),
        marked: false,
        subTitle: `M${i + 1}`
      })
    }
    const options: CalendarModalOptions = {
      weekdays: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
      weekStart: 1,
      from: new Date(2017, 6, 1),
      to: new Date(2018, 9, 1),
      defaultScrollTo: new Date(),
      daysConfig: _daysConfig,
      color: 'dark',
      defaultDate: new Date()
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      this.selectedDate = date.string;
      const monthNames = ["Jan", "Fev", "Mar", "Avr", "May", "Jun",
        "Jul", "Auo", "Sep", "Act", "Nov", "Dec"
      ];
      this.dateEntete = date.date + ' ' + monthNames[date.months - 1];
      this.updateListFixtureAndCompets();
    });
  }


  getAllFixtures(compet: any) {
    this.competitionsProvider.getFixturesByDayAndCompet(this.selectedDate, compet)
      .then(data => {
        return data;
      });
  }


  goToProfile() {
  }



  // getUrlImageTeam(idTeam: any) {
  //   this.competitionsProvider.getTeamsById(idTeam)
  //     .then(data => {
  //       console.log(data['crestUrl']);
  //       return data['crestUrl'];
  //     });
  // }


}
