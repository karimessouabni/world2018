import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Items } from '../../providers/providers';

import {CompetitionProvider} from '../../providers/competition/competition';

import { Item } from '../../models/item';

import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  competitions2017 : any ;
  selectedDate : any;

  constructor(public navCtrl: NavController, public items: Items, public competitionsProvider : CompetitionProvider, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
     this.competitionsProvider.getCompetitions2017()
    .then(data => {
      this.competitions2017 = data;
    });
    this.selectedDate = new Date();
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

  openCompet(compet:any){
    this.navCtrl.push(ItemDetailPage, {
      compet: compet
    });
  }

  openCalendar() {
    
        let _daysConfig: DayConfig[] = [];
        for (let i = 0; i < 31; i++) {
          _daysConfig.push({
            date: new Date(2017, 8, i + 1),
            marked :false,
            subTitle: `M${i + 1}`
          })
        }
    
    
        const options: CalendarModalOptions = {
          weekdays: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
          weekStart: 1,
          from: new Date(2017, 6, 1),
          to: new Date(2018, 9, 1),
          defaultScrollTo : new Date(),
          daysConfig: _daysConfig,
          defaultDate: new Date()
        };
    
    
        let myCalendar =  this.modalCtrl.create(CalendarModal, {
          options: options
        });
    
    
       myCalendar.present();
    
        myCalendar.onDidDismiss(date => {
          this.selectedDate = date.dateObj ;
          console.log(date.string);
        });
      }


}
