import { Element } from './Element';

export class Sheet {

    elementsList: Array<Element> = new Array<Element>();
    player: any = null;



    constructor(public myElements: Array<Element>) {
        this.elementsList = myElements;
    }



    getSumToWin(mise: number): number {
        var resultToReturn = 0;
        this.elementsList.forEach(element => {
            resultToReturn += element.getSumToWin(mise);
        });
        return resultToReturn;
    }
    
    getResult(mise: number): number {
        var resultToReturn = 0;
        this.elementsList.forEach(element => {
            resultToReturn += element.getResult(mise);
        });
        return resultToReturn;
    }

}