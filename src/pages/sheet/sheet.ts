import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sheet } from '../../models/Sheet';
import { Element } from '../../models/Element';
import { Cote } from '../../models/Cote';

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
export class SheetPage {
  fixture: any;
  sheet: Sheet;
  showStyle: false;
  selectedCote1 : any;
  selectedCote2 : any;
  selectedCote3 : any;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixture = navParams.data;
    this.createElement12N();
    this.createElementNumberGoals();

  }

  createElement12N() {
    var cHomeTeam = new Cote(this.fixture.homeTeamName, 2, false, false);
    var cNul = new Cote("0 : 0", 2, false, false);
    var cAwayTeam = new Cote(this.fixture.awayTeamName, 2, false, false);
    var cotes1 = [cHomeTeam, cNul, cAwayTeam];
    var elem1 = new Element(cotes1, "1N2");
    this.sheet = new Sheet([elem1], "Player1");
  }

  createElementNumberGoals() {
    var c1 = new Cote("0 but", 0.5, false, false);
    var c2 = new Cote("1 but", 0.5, false, false);
    var c3 = new Cote("2 buts", 0.5, false, false);
    var c4 = new Cote("3 buts", 2, false, false);
    var c5 = new Cote("4 buts", 5, false, false);
    var c6 = new Cote("5 buts", 15, false, false);
    var c7 = new Cote("6 buts", 50, false, false);
    var c8 = new Cote("7 buts", 100, false, false);
    var c9 = new Cote("8 buts", 120, false, false);
    var c10 = new Cote("9 buts", 150, false, false);
    var c11 = new Cote("10 ou plus buts", 200, false, false);
    var cotes = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11];
    var elem = new Element(cotes, "Nombre de buts par les 2 équipes");
    this.sheet.elementsList.push(elem);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SheetPage');
  }


  selectCote0(team: any) {
    this.selectedCote1 = team;
  }

  selectCote1(cote: any) {
    this.selectedCote2 = cote;
  }
}
