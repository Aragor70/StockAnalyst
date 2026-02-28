import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import IndexContainer from './Container';
import Header from '../common/Header/Header';

const IndexPresentation = () => {

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <IndexContainer name="Tab 1 page" />
            </IonContent>
        </IonPage>
    )
}
export default IndexPresentation;