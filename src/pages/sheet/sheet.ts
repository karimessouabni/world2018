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
  selectedCote: Map<number, any> = new Map();
  selectedCote1: any;
  selectedCote2: any;
  selectedCote3: any;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixture = navParams.data;
    this.createElement12N();
    this.createElementNumberGoals();
    this.createElementExactScore();

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
    var c1 = new Cote("0 But", 0.5, false, false);
    var c2 = new Cote("1 But", 0.5, false, false);
    var c3 = new Cote("2 Buts", 0.5, false, false);
    var c4 = new Cote("3 Buts", 2, false, false);
    var c5 = new Cote("4 Buts", 5, false, false);
    var c6 = new Cote("5 Buts", 15, false, false);
    var c7 = new Cote("6 Buts", 50, false, false);
    var c8 = new Cote("7 Buts", 100, false, false);
    var c9 = new Cote("8 Buts", 120, false, false);
    var c10 = new Cote("9 Buts", 150, false, false);
    var c11 = new Cote("10 Buts ou plus", 200, false, false);
    var cotes = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11];
    var elem = new Element(cotes, "Nombre de Buts par les 2 équipes");
    this.sheet.elementsList.push(elem);
  }

  createElementExactScore() {
    var c1 = new Cote("0:0", 0.5, false, false);
    var c2 = new Cote("1:0", 0.5, false, false);
    var c3 = new Cote("2:0", 0.5, false, false);
    var c4 = new Cote("3:0", 2, false, false);
    var c5 = new Cote("4:0", 5, false, false);

    var c6 = new Cote("0:1", 0.5, false, false);
    var c7 = new Cote("0:2", 0.5, false, false);
    var c8 = new Cote("0:3", 2, false, false);
    var c9 = new Cote("0:4", 5, false, false);

    var c10 = new Cote("1:1", 0.5, false, false);
    var c11 = new Cote("2:1", 0.5, false, false);
    var c12 = new Cote("3:1", 2, false, false);
    var c13 = new Cote("4:1", 5, false, false);

    var c14 = new Cote("1:2", 0.5, false, false);
    var c15 = new Cote("1:3", 2, false, false);
    var c16 = new Cote("1:4", 5, false, false);

    var c17 = new Cote("2:2", 0.5, false, false);
    var c18 = new Cote("3:2", 2, false, false);
    var c19 = new Cote("4:2", 5, false, false);

    var c20 = new Cote("2:3", 2, false, false);
    var c21 = new Cote("2:4", 5, false, false);

    var c22 = new Cote("3:3", 2, false, false);
    var c23 = new Cote("4:3", 5, false, false);

    var c24 = new Cote("3:4", 5, false, false);
    var c25 = new Cote("autre", 5, false, false);


    var cotes = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25];
    var elem = new Element(cotes, "Score exact");
    this.sheet.elementsList.push(elem);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SheetPage');
  }


  selectCote(param: any, elementTtitle: String) {

    switch (elementTtitle) {
      case "1N2":
        this.selectCoteI(param, 0);
        break;

      case "Nombre de Buts par les 2 équipes":
        this.selectCoteI(param, 1);
        break;

      case "Score exact":
        this.selectCoteI(param, 2);
        break;

    }


  }

  selectCoteI(param: any, index: number) {

    this.selectedCote[index] = (this.selectedCote[index] == param) ? null : param;

  }


}
