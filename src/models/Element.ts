import { Cote } from './Cote';

export class Element {

    cotesList: Cote[];
    result: number;
    title: any;


    constructor(public myCotesList: Cote[], title) {
        this.cotesList = myCotesList;
        this.title = title;
    }


    getResult(mise: number): number {
        var resultToReturn = 0;
        this.cotesList.forEach(cote => {
            resultToReturn += cote.getResult(mise);
        });
        return resultToReturn;
    }

}