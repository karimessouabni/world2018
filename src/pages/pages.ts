import { ListMasterPage } from './list-master/list-master';
import { SearchPage } from './search/search';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { AllMatchBets } from './3BetPages/all-match-bets/all-match-bets';
import { TutorialPage } from './tutorial/tutorial';
import { ProfilPage } from './profil/profil';
import { AddFriendsPage } from './add-friends/add-friends';
import { Bilan2PlayersPage } from './bilan2-players/bilan2-players';
import { WelcomePage } from './welcome/welcome';
import { MyBetsPage } from './my-bets/my-bets';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;


export {
    ProfilPage, 
    SettingsPage,
    AllMatchBets,
    ListMasterPage,
    TabsPage,
    SearchPage,
    AddFriendsPage,
    Bilan2PlayersPage,
    WelcomePage,
    MyBetsPage
}
