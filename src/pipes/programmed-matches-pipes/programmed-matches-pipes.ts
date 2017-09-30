import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProgrammedMatchesPipesPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'programmedMatchesPipes',
})
export class ProgrammedMatchesPipesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}