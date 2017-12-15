import { Game } from './Game';
import { Player } from './PlayerModel/Player';
import { Bet } from './Bet';

export class GameFvsF extends Game {

    player2: Player;
    sheetBet2: Bet;

    constructor(player1: Player, sheetBet1: Bet, player2: Player, sheetBet2: Bet) {
        super(player1, sheetBet1);
        this.player2 = player2;
        this.sheetBet2 = sheetBet2;
    }

}