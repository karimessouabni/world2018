import { Pipe, PipeTransform} from '@angular/core';



@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
        if(key=="fixtures")
        keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}