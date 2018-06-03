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

  constructor(public http: Http) {
    console.log('Hello WorldCupProvider Provider');
  }


  getWorldCupTable(idGroup: String) {
    return new Promise(resolve => {
      this.http.get("http://188.166.174.3:8080/api/WCTable" + idGroup )
        .map(res => res.json())
        .subscribe(table => {
          resolve(table);
        });
    });
  }





}
