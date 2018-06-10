import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WorldCupProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WorldCupProvider {

  bestScorer: any[];
  videos: any[];
  constructor(public http: Http) {
    console.log('Hello WorldCupProvider Provider');
    this.bestScorer = [
      {
        "name": "Cristiano Ronaldo",
        "pos": "1",
        "team": "Portugal",
        "pic": "assets/img/cr7.jpg",
        "goals": "12"
      },
      {
        "name": "Lionel Messi",
        "pos": "2",
        "team": "Argentina",
        "pic": "assets/img/messi.jpg",
        "goals": "11"
      },
      {
        "name": "Neymar",
        "pos": "3",
        "team": "Brazil",
        "pic": "assets/img/naymar.jpg",
        "goals": "5"
      },
      {
        "name": "Mohamed Salah",
        "pos": "4",
        "team": "Portugal",
        "pic": "assets/img/mosalah.jpg",
        "goals": "5"
      },
      {
        "name": "Kylian Mbappé",
        "pos": "5",
        "team": "France",
        "pic": "assets/img/mbape.jpg",
        "goals": "3"
      }
    ];

    this.videos = [
      {
        "team": "Egypt",
        "title": "Liverpool's Mohamed Salah in Egypt's World Cup squad despite injury",
        "link": "https://www.bbc.com/sport/football/44354610",
        "pic": "https://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/1848A/production/_101866499_gettyimages-962750976.jpg",
        "subtitle": "Mohamed Salah left the pitch in tears after landing heavily on his shoulder following a challenge by Sergio Ramos in Kiev"
      },
      {
        "team": "Uruguy",
        "title": "Uruguay World Cup 2018 squad and team guide",
        "link": "https://www.telegraph.co.uk/world-cup/0/uruguay-world-cup-2018-squad-team-guide/",
        "pic": "https://www.telegraph.co.uk/content/dam/world-cup/2018/06/02/164955468_PA_2018-World-Cup-Package_trans_NvBQzQNjv4BqI_nWroZV2Kj5BLP-0LLaCBezeG5U5YVYbid-VJNQdlc.jpg?imwidth=1400",
        "subtitle": "Uruguay's World Cup squad -  the 23-man names"
      }
    ];
  }


  getGroupOfTeam(teamName: String) {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCTeam/" + teamName)
        .map(res => res.json())
        .subscribe(table => {
          resolve(table[0].group);
        });
    });
  }

  getWorldCupTable(idGroup: any) {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCTable/" + idGroup)
        .map(res => res.json())
        .subscribe(table => {
          let sortedTable = table.sort((a, b) => {
            return a.rank - b.rank;
          })
          resolve(sortedTable);
        });
    });
  }


  getWorldCupBestScorer() {
    return this.bestScorer;
  }


  getWorldCupNewsForTeam(teamName1: any, teamName2: any) {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCTeamNews/" + teamName1 + "/" + teamName2)
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }


  getWorldCupNews() {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCNews/")
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }


  getAllGroups() {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCTable/")
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }

  getWorldCupVideosForTeam(teamName1: any, teamName2: any) {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCVideos/" + teamName1 + "/" + teamName2)
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }

  getWorldCupVideos() {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCVideos/")
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }


  getWorldCuptopPlayers() {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCPlayers/")
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }

}
