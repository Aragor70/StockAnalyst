import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './styles/global.scss';

import { TabEnum } from './enums/common';
import Tab1 from './pages/Tab1';
import ProfilePage from './pages/ProfilePage';
import SinglePage from './pages/SinglePage';
import useActions from './hooks/usaActions';

setupIonicReact();

const App: React.FC = () => {

  const init = useActions().init

  useEffect(() => {
    init()
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/main">
              <Tab1 />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/single/:symbol">
              <SinglePage />
            </Route>
            
            <Route exact path="/">
              <Redirect to="/main" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {
              Object.values(TabEnum).map(element => (
                <IonTabButton key={element} tab={element} href={`/${element}`}>
                  <IonIcon aria-hidden="true" icon={triangle} />
                  <IonLabel>{element}</IonLabel>
                </IonTabButton>
              ))
            }
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
