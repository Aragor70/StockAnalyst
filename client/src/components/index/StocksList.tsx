import { IonList, IonItem, IonLabel, IonBadge } from "@ionic/react";

import styles from "./StocksList.module.scss";

interface Stock {
  symbol: string;
  price: number;
  change?: number;
}

const StocksList: React.FC<{ data: Stock[] }> = ({ data }) => {
  return (
    <IonList className={styles["stocks-list"]}>
      {data.map((s) => {
        const badgeColor =
          s.change && s.change > 0
            ? "success"
            : s.change && s.change < 0
            ? "danger"
            : "medium";

        return (
          <IonItem key={s.symbol} lines="full" className={styles["stock-item"]}>
            <IonLabel className={styles["stock-ticker"]}>{s.symbol}</IonLabel>
            <IonBadge color={badgeColor} className={styles["stock-price"]}>
              {s.price.toFixed(2)}
            </IonBadge>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default StocksList;