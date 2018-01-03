import { Sheet } from './Sheet';
import { Element } from './Element';
import { Bet } from './Bet';

export class Bet3Sheets extends Bet {



    sheetAllMatch = {} as Sheet;
    sheet145 = {} as Sheet;
    sheet245 = {} as Sheet;
    betCount: number = 0;




    constructor() {
        super();
        this.sheetAllMatch = new Sheet(new Array<Element>());
        this.sheet145 = new Sheet(new Array<Element>());
        this.sheet245 = new Sheet(new Array<Element>());
    }


    getAllSheets(): Array<Sheet> {
        var allSheets = new Array<Sheet>();
        allSheets.push(this.sheetAllMatch);
        allSheets.push(this.sheet145);
        allSheets.push(this.sheet245);
        return allSheets;
    }


    getSumToWin(mise: number): number {
        return this.sheetAllMatch.getSumToWin(mise)+this.sheet145.getSumToWin(mise)+this.sheet245.getSumToWin(mise);
    }
    getResult(mise: number): number {

        return this.sheetAllMatch.getResult(mise)+this.sheet145.getResult(mise)+this.sheet245.getResult(mise);
        
    }

}