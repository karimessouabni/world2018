export class Cote {

    title: string;
    coef: number;
    result: boolean;
    played: boolean;


    constructor(public myTitle: string, myCoef: number, myResult: boolean, myPlayed: boolean) {
        this.title = myTitle;
        this.coef = myCoef;
        this.result = myResult;
        this.played = myPlayed;

    }


    setPlayed(played: boolean) {
        this.played = played;
    }


    getSumToWin(mise: number): number {
        return  (this.played)? this.coef * mise : 0;
    }

    getResult(mise: number): number {
        if (this.played && this.result) {
            return this.coef * mise;
        } else if (this.played && !this.result) {
            return -this.coef * mise;
        }
        return 0;
    }

}