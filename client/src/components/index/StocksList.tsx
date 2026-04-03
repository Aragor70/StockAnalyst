import { IonList, IonItem, IonLabel, IonBadge } from "@ionic/react";
import styles from "./StocksList.module.scss";

interface Stock {
  symbol: string;
  price: number;
  change?: number;
}

const StocksList: React.FC<{ positions: Stock[]; wallet: any }> = ({ positions, wallet }) => {
  return (
    <IonList className={styles["stocks-list"]}>

      {/* HEADER */}
      <IonItem lines="none" className={styles.row}>
        <div className={styles.colLeft}>Symbol</div>
        <div className={styles.colRight}>Price</div>
        <div className={styles.colRight}>Owned</div>
      </IonItem>

      {positions.map((s) => {
        const owned = wallet.positions.find((p: any) => p.symbol === s.symbol);

        return (
          <IonItem key={s.symbol} lines="full" className={styles.row}>
            <div className={styles.colLeft}>{s.symbol}</div>

            <div className={styles.colRight}>
              <IonBadge color="medium">{s.price.toFixed(2)}</IonBadge>
            </div>

            <div className={styles.colRight}>
              {owned ? (
                <IonBadge color="success">{owned.amount}x</IonBadge>
              ) : (
                <IonBadge color="medium">–</IonBadge>
              )}
            </div>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default StocksList;