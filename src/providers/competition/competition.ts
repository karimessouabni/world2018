import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CompetitionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CompetitionProvider {

  competitions: any;
  data: any;
  matches: any;
  opt = new RequestOptions();
  constructor(public http: Http) {
    this.competitions = null;
    let myHeaders = new Headers();

    myHeaders.append('X-Auth-Token', '73d809746bd849fcb67e49ace137252a');
    myHeaders.append('Content-type', 'application/json');
    this.opt = new RequestOptions({
      headers: myHeaders
    })
  }


  getCompetitions2017() {
    if (this.competitions) {
      return Promise.resolve(this.competitions);
    }

    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/allCompetitions')
        .map(res => res.json())
        .subscribe(competitions => {
          this.competitions = competitions;
          resolve(this.competitions);
        });
    });
  }

  getPremierLeagueLastMatches() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://api.football-data.org/v1/competitions/445/fixtures', this.opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


  getPrimeraDivisionLastMatches() {//IN_PLAY
    if (this.matches) {

      return Promise.resolve(this.matches);

    }

    return new Promise(resolve => {
      this.http.get('http://api.football-data.org/v1/competitions/455/fixtures', this.opt)
        .map(res => res.json())
        .subscribe(matches => {
          this.matches = matches;
          resolve(this.matches);
        });
    });
  }



  getCompetitionLastMatches(idCompet: number) {//IN_PLAY
    console.log(idCompet);
    return new Promise(resolve => {
      this.http.get("http://api.football-data.org/v1/competitions/" + idCompet + "/fixtures", this.opt)
        .map(res => res.json())
        .subscribe(matches => {
          this.matches = matches;
          resolve(this.matches);
        });
    });
  }

  getFixturesByDay(day: any) {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/fixtures/'+day)
        .map(res => res.json())
        .subscribe(matches => {
          this.matches = matches;
          resolve(this.matches);
        });
    });
  }

  /*
  * Code des compet pour la recherche : a voir sur le serveur nodeJS
  */
  getFixturesByDayAndCompet(day: any, compet: any) {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/fixtures/'+day+'/'+compet)
        .map(res => res.json())
        .subscribe(matches => {
          this.matches = matches;
          resolve(this.matches);
        });
    });
  }


}
