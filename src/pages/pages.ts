import { ListMasterPage } from './list-master/list-master';
import { SearchPage } from './search/search';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import { SheetPage } from './sheet/sheet';
import { TutorialPage } from './tutorial/tutorial';
import { ProfilPage } from './profil/profil';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;


export {
    ProfilPage, 
    SettingsPage,
    SheetPage,
    ListMasterPage,
    TabsPage,
    SearchPage
}
