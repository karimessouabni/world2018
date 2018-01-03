import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TeamsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TeamsProvider {

  linkTeamImg : any;
  opt : any;
  constructor(public http: Http) {
    this.linkTeamImg = null ;
    let myHeaders = new Headers();
    
    myHeaders.append('X-Auth-Token', '73d809746bd849fcb67e49ace137252a');
    myHeaders.append('Content-type', 'application/json');
    this.opt = new RequestOptions({
     headers: myHeaders
    })   
  }

  


  getTeamImg(link : any){        
    if (this.linkTeamImg) {
      return Promise.resolve(this.linkTeamImg);
    }
 
    return new Promise(resolve => {
      this.http.get(link, this.opt)
        .map(res => res.json())
        .subscribe(data => {
          this.linkTeamImg = data;
          this.linkTeamImg = JSON.parse(data).name;
          resolve(this.linkTeamImg);
        });
    });
  }


}
