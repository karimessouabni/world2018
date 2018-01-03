import { Game, GameType} from './Game';
import { Player } from './PlayerModel/Player';
import { Bet } from './Bet';
import { Bet3Sheets } from './bet3Sheets';


export class GameFvsF extends Game {

    player2Uid: String;
    sheetBet2: Bet3Sheets;
    typeGame: GameType;

    constructor(player1: String, sheetBet1: Bet3Sheets, player2: String, sheetBet2: Bet3Sheets, idFixture : String, typeGame : GameType) {
        super(player1, sheetBet1, idFixture);
        this.player2Uid = player2;
        this.sheetBet2 = sheetBet2;
        this.typeGame = typeGame;
    }

}