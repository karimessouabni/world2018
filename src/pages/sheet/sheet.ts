import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sheet } from '../../models/Sheet';
import { Bet3Sheets } from '../../models/bet3Sheets';
import { Events } from 'ionic-angular';
import { Cote } from '../../models/Cote';
import { Element } from '../../models/Element';



/**
 * Generated class for the SheetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sheet',
  templateUrl: 'sheet.html',
})

export class SheetPage  {
  fixture: any;
  sheet: Sheet;
  showStyle: false;
  selectedCote: Map<number, any> = new Map();
  bet3Sheets: Bet3Sheets;


  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.bet3Sheets = navParams.data;
    this.sheet = this.bet3Sheets.sheetAllMatch;
  }

  selectCote(cote: Cote, element: Element) {

    switch (element.title) {
      case "1N2":
        this.selectCoteI(cote, 0, element);
        break;

      case "Nombre de Buts par les 2 équipes":
        this.selectCoteI(cote, 1, element);
        break;

      case "Score exact":
        this.selectCoteI(cote, 2, element);
        break;
      case "Buts d'ecart":
        this.selectCoteI(cote, 3, element);
        break;

    }


  }

  selectCoteI(cote: Cote, elementIndex: number, element: Element) {
    if(this.selectedCote[elementIndex] == cote.title){
      this.selectedCote[elementIndex] = null ;
      cote.played=false ;
      element.played = false; 
      this.bet3Sheets.betCount--;
    }
    else{
      if(this.selectedCote[elementIndex]==null) this.bet3Sheets.betCount++;
      this.selectedCote[elementIndex] = cote.title;
      element.restPlayedCotes(); 
      cote.played = true;
      element.played = true;
    }
    this.events.publish('functionCall:tabSelected', this.bet3Sheets);
  }




}
