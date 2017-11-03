import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sheet } from '../../models/Sheet';
import { Cote } from '../../models/Cote';
import { Element } from '../../models/Element';
import { Bet3Sheets } from '../../models/bet3Sheets';

/**
 * Generated class for the BilanBetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilan-bet',
  templateUrl: 'bilan-bet.html',
})
export class BilanBetPage {
  fixture: any;
  playedElementsIn3Sheets: Bet3Sheets;
  showStyle: false;
  selectedCote: Map<number, any> = new Map();
  bet3Sheets: Bet3Sheets;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bet3Sheets = navParams.get('playedSheets');
    this.playedElementsIn3Sheets = new Bet3Sheets();
    this.fillListPlayedElement();
  }



  public fillListPlayedElement() {
    for (var i = 0; i < this.bet3Sheets.sheetAllMatch.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(this.bet3Sheets.sheetAllMatch.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheetAllMatch.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheetAllMatch.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheetAllMatch.elementsList[i].title);
        this.playedElementsIn3Sheets.sheetAllMatch.elementsList.push(el);
      }
    }
    for (var i = 0; i < this.bet3Sheets.sheet145.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet145.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet145.elementsList.push(this.bet3Sheets.sheet145.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet145.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet145.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheet145.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet145.elementsList.push(el);
      }
    }
    for (var i = 0; i < this.bet3Sheets.sheet245.elementsList.length; i++) {
      if (i == 0 && this.bet3Sheets.sheet245.elementsList[i].played == true) {
        this.playedElementsIn3Sheets.sheet245.elementsList.push(this.bet3Sheets.sheet245.elementsList[i]);
        continue;
      }
      if (this.bet3Sheets.sheet245.elementsList[i].played == true) {
        var coteTab = new Array<Cote>();
        coteTab.push(this.bet3Sheets.sheet245.elementsList[i].getPlayedCote());
        var el = new Element(coteTab, this.bet3Sheets.sheet245.elementsList[i].title);
        this.playedElementsIn3Sheets.sheet245.elementsList.push(el);
      }
    }

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad BilanBetPage');
  }

}
