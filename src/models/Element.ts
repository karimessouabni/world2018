import { Cote } from './Cote';

export class Element {

    cotesList: Cote[];
    result: number;
    title: any;
    played: boolean = false;


    constructor(public myCotesList: Cote[], title) {
        this.cotesList = myCotesList;
        this.title = title;
    }



    getPlayedCote(): Cote {
        var c: Cote;
        this.cotesList.forEach(cote => {
            if (cote.played) c = cote;
        });
        return c;
    }

    getResult(mise: number): number {
        var resultToReturn = 0;
        this.cotesList.forEach(cote => {
            resultToReturn += cote.getResult(mise);
        });
        return resultToReturn;
    }

}