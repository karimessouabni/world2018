import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TeamNamePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'teamNamePipe',
})
export class TeamNamePipe implements PipeTransform {



  transform(value: string, ...args) {
    var splittedName = value.split(" ");
    var i: any;
    var resultName = splittedName[0];

    for (i in splittedName) {
      if (splittedName[i].length > resultName.length)
        resultName = splittedName[i];
    }

    return this.capitalizeFirstLetter(resultName);
  }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
