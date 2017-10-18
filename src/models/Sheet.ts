import { Element } from './Element';

export class Sheet {

    elementsList: Element[];
    player: any;



    constructor(public myElements: Element[], myPlayer:any) {
        this.elementsList = myElements;
        this.player = myPlayer;
    }


    getResult(mise: number): number {
        var resultToReturn = 0;
        this.elementsList.forEach(element => {
            resultToReturn += element.getResult(mise);
        });
        return resultToReturn;
    }

}