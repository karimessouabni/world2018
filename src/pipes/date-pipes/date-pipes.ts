import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProgrammedMatchesPipesPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'HM',
})
export class DatePipes implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if (value != null) { //"2017-10-31T19:45:00Z"
      switch (args[0]) {
        case "SCHEDULED": {
          return value.substring(11, 16);
        }
        case "FINISHED":{
          return args[1].goalsHomeTeam.toString()+"-"+args[1].goalsAwayTeam.toString();
        }
        case "TIMED":{
          return value.substring(11, 16);
        }
        case "CANCELED":{
          return "Annulé";
        }
        case "IN_PLAY":{
          return args[1].goalsHomeTeam.toString()+"-"+args[1].goalsAwayTeam.toString();
        }
        case "POSTPONED":{
          return "Reporté";
        }
      }

    }

  }
}
