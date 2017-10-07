import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
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

  constructor(public navCtrl: NavController, public items: Items, public competitionsProvider: CompetitionProvider, public modalCtrl: ModalController) {
    this.updateSelectedDate();
    this.updateListFixtureAndCompets();
  }


  updateListFixtureAndCompets() {
    this.allCompetUpdated = [];
    this.competitionsProvider.getCompetitions2017()
      .then(dataCompet => {
        this.allCompets = dataCompet;
        dataCompet.forEach(compet => { // pour chaque competition : PrimeraDivision
          this.competitionsProvider.getFixturesByDayAndCompet(this.selectedDate, compet.league)
            .then(dataFixtures => { // match du jours : PrimeraDivision's Matchs of today 
              dataFixtures.forEach(fixture => {

                this.competitionsProvider.getTeamsById(fixture["idHomeTeam"])
                  .then(dataTeam => {
                    fixture['urlhomeTeam'] = dataTeam['crestUrl'];

                    this.competitionsProvider.getTeamsById(fixture["idAwayTeam"])
                    .then(dataTeam2 => {
                      fixture['urlawayTeam'] = dataTeam2['crestUrl'];
  
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

  updateSelectedDate() {
    var dateNonFormated = new Date();
    var month: any = dateNonFormated.getMonth();
    month = month + 1;
    var day: any = dateNonFormated.getDate();
    if ((String(day)).length == 1)
      day = '0' + day;
    if ((String(month)).length == 1)
      month = '0' + month;
    this.selectedDate = dateNonFormated.getFullYear() + '-' + month + '-' + day;

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */

  openCompet(compet: any) {
    this.navCtrl.push(ItemDetailPage, {
      compet: compet
    });
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
      defaultDate: new Date()
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      this.selectedDate = date.string;
      this.updateListFixtureAndCompets();
    });
  }


  getAllFixtures(compet: any) {
    this.competitionsProvider.getFixturesByDayAndCompet(this.selectedDate, compet)
      .then(data => {
        return data;
      });
  }


  // getUrlImageTeam(idTeam: any) {
  //   this.competitionsProvider.getTeamsById(idTeam)
  //     .then(data => {
  //       console.log(data['crestUrl']);
  //       return data['crestUrl'];
  //     });
  // }


}
