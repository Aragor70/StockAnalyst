import { IonPage, IonContent, IonAvatar, IonText, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonIcon, IonButton } from "@ionic/react";
import { settingsOutline, lockClosedOutline, logOutOutline, walletOutline } from "ionicons/icons";

import styles from "./ProfilePage.module.scss";

const ProfilePresentation: React.FC = () => {
  return (
    <IonPage>
      <IonContent className={styles.content}>

        <div className={styles.header}>
          <IonAvatar className={styles.avatar}>
            <img src="https://i.pravatar.cc/300" alt="avatar" />
          </IonAvatar>

          <IonText className={styles.name}>Mikolaj</IonText>
          <IonText className={styles.email}>mikolaj@example.com</IonText>
        </div>

        <IonCard className={styles.statsCard}>
          <IonCardContent>
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <IonText className={styles.statValue}>12 450 zł</IonText>
                <IonText className={styles.statLabel}>Wartość portfela</IonText>
              </div>

              <div className={styles.statBox}>
                <IonText className={styles.statValue}>8</IonText>
                <IonText className={styles.statLabel}>Inwestycji</IonText>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <IonList className={styles.list}>

          <IonItem button detail className={styles.listItem}>
            <IonIcon icon={walletOutline} slot="start" />
            <IonLabel>Portfel</IonLabel>
          </IonItem>

          <IonItem button detail className={styles.listItem}>
            <IonIcon icon={settingsOutline} slot="start" />
            <IonLabel>Ustawienia</IonLabel>
          </IonItem>

          <IonItem button detail className={styles.listItem}>
            <IonIcon icon={lockClosedOutline} slot="start" />
            <IonLabel>Bezpieczeństwo</IonLabel>
          </IonItem>

        </IonList>

        <div className={styles.logout}>
          <IonButton color="danger" expand="block">
            <IonIcon icon={logOutOutline} slot="start" />
            Wyloguj się
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePresentation;