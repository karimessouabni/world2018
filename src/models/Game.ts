import { Sheet } from './Sheet';

export class Game {

    sheet1: Sheet;
    sheet2: Sheet;
    playerWinner: any;
    mise: number;




    constructor(mySheet1: Sheet, mySheet2: Sheet, myMise: number) {
        this.sheet1 = mySheet1;
        this.sheet2 = mySheet2;
        this.mise = myMise;
        this.playerWinner = null;
    }



    getResultSheet1(): number {
        return this.sheet1.getResult(this.mise);
    }

    getResultSheet2(): number {
        return this.sheet2.getResult(this.mise);
    }
    getWinner() {
        this.playerWinner = (this.getResultSheet1() > this.getResultSheet2()) ? this.sheet1.player : this.sheet2.player;
    }


}