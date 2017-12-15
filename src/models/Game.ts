import { Bet3Sheets } from './bet3Sheets';
import { Player } from './PlayerModel/Player';
import { Bet } from './Bet';

export abstract class Game {


    player1: Player;
    sheetBet1: Bet;

    constructor(player1: Player, sheetBet1: Bet) {
        this.player1 = player1;
        this.sheetBet1 = sheetBet1;
    }



   
    getWinner() {
        // TO redefine
        // this.playerWinner = (this.getResultSheet1() > this.getResultSheet2()) ? this.sheet1.player : this.sheet2.player;
    }


}