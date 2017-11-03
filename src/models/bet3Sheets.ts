import { Sheet } from './Sheet';
import { Element } from './Element';

export class Bet3Sheets {



    sheetAllMatch: Sheet;
    sheet145: Sheet;
    sheet245: Sheet;
    betCount: number = 0;




    constructor() {
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

    getResult(mise: number): number {

        return 0;
    }

}