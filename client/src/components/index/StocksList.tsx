import { IonList, IonItem, IonLabel, IonBadge } from "@ionic/react";
import { useHistory } from "react-router";

import styles from "./StocksList.module.scss";

interface Stock {
  symbol: string;
  price: number;
  change?: number;
}

const StocksList: React.FC<{ positions: Stock[]; wallet: any }> = ({ positions, wallet }) => {

  const history = useHistory();
  
  return (
    <IonList className={styles["stocks-list"]}>

      {/* HEADER */}
      <IonItem lines="none" className={styles.row}>
        <div className={styles.colLeft}>Symbol</div>
        <div className={styles.colRight}>Price</div>
        <div className={styles.colRight}>Owned</div>
      </IonItem>

      {positions.map((element) => {
        const owned = wallet.positions.find((p: any) => p.symbol === element.symbol);

        return (
          <IonItem key={element.symbol} lines="full" className={styles.row} onClick={() => history.push(`/single/${element.symbol}`)}>
            <div className={styles.colLeft}>{element.symbol}</div>

            <div className={styles.colRight}>
              <IonBadge color="medium">{element.price.toFixed(2)}</IonBadge>
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