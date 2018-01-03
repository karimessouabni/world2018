import { AuthProvider } from './auth/auth';
import { Bet3SheetsProvider } from './bet3-sheets/bet3-sheets';
import { CompetitionProvider } from './competition/competition';
import { PlayerProvider } from './player/player';
import { GameProvider, RetourPendingGame } from './game/game';
import { TeamsProvider } from './teams/teams';
import { Api } from './api';
import { Settings } from './settings';
import { Items } from '../mocks/providers/items';

export {
    AuthProvider,
    Bet3SheetsProvider,
    CompetitionProvider,
    PlayerProvider,
    TeamsProvider,
    Api,
    Settings,
    Items,
    GameProvider, 
    RetourPendingGame
};
