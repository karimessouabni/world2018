import { Cote } from './Cote';

export class Element {

    cotesList: Cote[];
    result: number;


    constructor(public myCotesList: Cote[]) {
        this.cotesList = myCotesList;
    }


    getResult(mise: number): number {
        var resultToReturn = 0;
        this.cotesList.forEach(cote => {
            resultToReturn += cote.getResult(mise);
        });
        return resultToReturn;
    }

}