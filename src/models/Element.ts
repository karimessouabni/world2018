import { Cote } from './Cote';

export class Element {

    cotesList = {} as Cote[];
    result: number;
    title: any;
    played: boolean = false;


    constructor(public myCotesList: Cote[], title) {
        this.cotesList = myCotesList;
        this.title = title;
        this.result = 0 ;
    }



    getPlayedCote(): Cote {
        var c: Cote;
        this.cotesList.forEach(cote => {
            if (cote.played) c = cote;
        });
        return c;
    }

    restPlayedCotes(){
        this.cotesList.forEach(cote => {
            if (cote.played) cote.played = false;
        });
    }

    getSumToWin(mise: number): number {
        var resultToReturn = 0;
        this.cotesList.forEach(cote => {
            resultToReturn += cote.getSumToWin(mise);
        });
        return resultToReturn;
    }

    getResult(mise: number): number {
        var resultToReturn = 0;
        this.cotesList.forEach(cote => {
            resultToReturn += cote.getResult(mise);
        });
        return resultToReturn;
    }

}