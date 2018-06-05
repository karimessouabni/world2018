import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let BestScorer = [
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
  
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
