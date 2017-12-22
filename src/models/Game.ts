import { Bet3Sheets } from './bet3Sheets';
import { Player } from './PlayerModel/Player';
import { Bet } from './Bet';

export enum GameType {
    strangerVsStranger,
    FriendVsFriend
}
export abstract class Game {


    idFixture : String;
    player1Uid: String;
    sheetBet1: Bet3Sheets;
    

    constructor(player1: String, sheetBet1: Bet3Sheets, idFixture: String) {
        this.player1Uid = player1;
        this.sheetBet1 = sheetBet1;
        this.idFixture  = idFixture;
    }



   
    getWinner() {
        // TO redefine
        // this.playerWinner = (this.getResultSheet1() > this.getResultSheet2()) ? this.sheet1.player : this.sheet2.player;
    }


}