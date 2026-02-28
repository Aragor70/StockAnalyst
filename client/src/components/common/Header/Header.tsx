import { IonHeader, IonToolbar, IonButtons, IonIcon } from "@ionic/react";
import { personCircleOutline, searchOutline } from "ionicons/icons";

import HeaderAccordion from "./HeaderAccordion";

const Header: React.FC = () => {
  return (
    <IonHeader>
        <IonToolbar>

            <IonButtons slot="start">
                <IonIcon icon={personCircleOutline} size="large" />
            </IonButtons>

            <HeaderAccordion
                total={12450}
                invested={10000}
                history={[10000, 10500, 11000, 11500, 12000, 12450]}
            />

            <IonButtons slot="end">
                <IonIcon icon={searchOutline} size="large" />
            </IonButtons>

        </IonToolbar>
    </IonHeader>
  );
};

export default Header;