import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CompetitionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CompetitionProvider {

  competitions : any; 
  constructor(public http: Http) {
    console.log('Hello CompetitionProvider Provider');
    this.competitions = null ;
  }


  getCompetitions2017(){        
    console.log("lplplplplplplplpl");
       if (this.competitions) {
         console.log(this.competitions);
         return Promise.resolve(this.competitions);
       }
    
       return new Promise(resolve => {
        let myHeaders = new Headers();
        myHeaders.append('Ocp-Apim-Subscription-Key', '2a29e04e233a4ab1a4a3856027f80dde');
        myHeaders.append('Content-type', 'application/json');
        
         this.http.get('http://api.football-data.org/v1/competitions/?season=2017')
           .map(res => res.json())
           .subscribe(competitions => {
             this.competitions = competitions;
             resolve(this.competitions);
           });
       });
    
     }

}
