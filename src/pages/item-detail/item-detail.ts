import { Component, state, keyframes } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers/providers';
import { CompetitionProvider } from '../../providers/competition/competition';
import { TeamsProvider } from '../../providers/teams/teams';
import { SuperTabsModule } from 'ionic2-super-tabs'
import { ItemCreatePage } from '../item-create/item-create';
import { SheetPage } from '../sheet/sheet';
import { FirstHtBetsPage } from '../first-ht-bets/first-ht-bets';
import { SecondHtBetsPage } from '../second-ht-bets/second-ht-bets';
import { BilanBetPage } from '../bilan-bet/bilan-bet';
import { TeamTablePage } from '../team-table/team-table';
import { Bet3Sheets } from '../../models/bet3Sheets';
import { Sheet } from '../../models/Sheet';
import { Element } from '../../models/Element';
import { Cote } from '../../models/Cote';
import { DatePipes } from '../../pipes/date-pipes/date-pipes';
import { TeamNamePipe } from '../../pipes/team-name/team-name';
import { Events } from 'ionic-angular';
import { trigger, style, transition, animate, group }from '@angular/animations';


@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateX(-50%)'}),
        animate(150)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translate(150px,55px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
  })

export class ItemDetailPage {
  fixture: any;
  matches: any;
  teamImgLink: any;
  pageParis1: any = SheetPage;
  pageParis2: any = FirstHtBetsPage;
  pageParis3: any = SecondHtBetsPage;
  BilanPage: any = BilanBetPage;
  teamTable: any = TeamTablePage;
  sheet: Sheet;
  bet3Sheets: Bet3Sheets;
  betCount: number;
  pageClassement
  constructor(private pipeTeam: TeamNamePipe, public navCtrl: NavController, public competitionsProvider: CompetitionProvider, public teamsProvider: TeamsProvider, navParams: NavParams, items: Items, public events: Events) {

    this.fixture = navParams.get('fixture');
    this.competitionsProvider.getCompetitionLastMatches(this.fixture.idCompet)
      .then(data => {
        this.matches = data;
      });

    this.bet3Sheets = new Bet3Sheets();

    this.createElement12NAllMatch();
    this.createElementNumberGoalsAllMatch();
    this.createElementExactScoreAllMatch();
    this.createElementDiffNumberGoalsAllMatch()

    this.createElement12N145();
    this.createElementNumberGoals145();
    this.createElementExactScore145();
    this.createElementDiffNumberGoals145()

    this.createElement12N245();
    this.createElementNumberGoals245();
    this.createElementExactScore245();
    this.createElementDiffNumberGoals245()

    // this.betCount = this.bet3Sheets.sheetAllMatch.player;

    this.events.subscribe('functionCall:tabSelected', eventData => {
      this.betCount = eventData.betCount;

    });

  }


  openBilanSubmitOnline(mySheetsPlayed: Bet3Sheets) {
    this.navCtrl.push(BilanBetPage, {
      online:true,
      playedSheets: mySheetsPlayed,
      fixture:this.fixture
    });
  }

  createElement12NAllMatch() {
    var cHomeTeam = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName), 2, false, false);
    var cNul = new Cote("0 : 0", 2, false, false);
    var cAwayTeam = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName), 2, false, false);
    var cotes1 = [cHomeTeam, cNul, cAwayTeam];
    var elem1 = new Element(cotes1, "1N2");
    this.bet3Sheets.sheetAllMatch = new Sheet([elem1]);
  }

  createElementNumberGoalsAllMatch() {
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
    this.bet3Sheets.sheetAllMatch.elementsList.push(elem);
  }

  createElementExactScoreAllMatch() {
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
    this.bet3Sheets.sheetAllMatch.elementsList.push(elem);
  }

  createElementDiffNumberGoalsAllMatch() {
    var c1 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c2 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c3 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);

    var c4 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c5 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c6 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);
    var c7 = new Cote("Les deux equipes font match nul", 0.5, false, false);


    var cotes = [c1, c2, c3, c4, c5, c6, c7];
    var elem = new Element(cotes, "Buts d'ecart");
    this.bet3Sheets.sheetAllMatch.elementsList.push(elem);
  }

  createElement12N145() {
    var cHomeTeam = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName), 2, false, false);
    var cNul = new Cote("0 : 0", 2, false, false);
    var cAwayTeam = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName), 2, false, false);
    var cotes1 = [cHomeTeam, cNul, cAwayTeam];
    var elem1 = new Element(cotes1, "1N2 à la fin de la première mi-temps");
    this.bet3Sheets.sheet145 = new Sheet([elem1]);
  }

  createElementNumberGoals145() {
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
    var elem = new Element(cotes, "Nombre de Buts par les 2 équipes à la 45'");
    this.bet3Sheets.sheet145.elementsList.push(elem);
  }

  createElementExactScore145() {
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
    var elem = new Element(cotes, "Score exact à la 45'");
    this.bet3Sheets.sheet145.elementsList.push(elem);
  }

  createElementDiffNumberGoals145() {
    var c1 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c2 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c3 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);

    var c4 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c5 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c6 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);
    var c7 = new Cote("Les deux equipes font match nul", 0.5, false, false);


    var cotes = [c1, c2, c3, c4, c5, c6, c7];
    var elem = new Element(cotes, "Buts d'ecart à la 45'");
    this.bet3Sheets.sheet145.elementsList.push(elem);
  }

  createElement12N245() {


    var cHomeTeam = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName), 2, false, false);
    var cNul = new Cote("0 : 0", 2, false, false);
    var cAwayTeam = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName), 2, false, false);
    var cotes1 = [cHomeTeam, cNul, cAwayTeam];
    var elem1 = new Element(cotes1, "1N2 entre 45' et 90'");
    this.bet3Sheets.sheet245 = new Sheet([elem1]);
  }

  createElementNumberGoals245() {
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
    var elem = new Element(cotes, "Nombre de Buts par les 2 équipes entre 45' et 90'");
    this.bet3Sheets.sheet245.elementsList.push(elem);
  }

  createElementExactScore245() {
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
    var elem = new Element(cotes, "Score exact entre 45' et 90'");
    this.bet3Sheets.sheet245.elementsList.push(elem);
  }

  createElementDiffNumberGoals245() {
    var c1 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c2 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c3 = new Cote(this.pipeTeam.transform(this.fixture.homeTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);

    var c4 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 1 But d'ecart", 0.5, false, false);
    var c5 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 2 Buts d'ecart", 0.5, false, false);
    var c6 = new Cote(this.pipeTeam.transform(this.fixture.awayTeamName) + " Gagne avec 3 Buts ou plus d'ecart", 0.5, false, false);
    var c7 = new Cote("Les deux equipes font match nul", 0.5, false, false);


    var cotes = [c1, c2, c3, c4, c5, c6, c7];
    var elem = new Element(cotes, "Buts d'ecart entre 45' et 90'");
    this.bet3Sheets.sheet245.elementsList.push(elem);
  }

  getLinkTeamImg(linkToApi: any) {
    this.teamImgLink = this.teamsProvider.getTeamImg(linkToApi);
  }

  onTabSelect(ev: any) {
    if (ev.index == 3)
      this.BilanPage.fillListPlayedElement();
  }






}
