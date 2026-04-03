import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonBadge, IonText } from "@ionic/react";
import { useEffect, useMemo } from "react";

import { MarketInfo } from "../../services/marketService";
import InvestmentChart from "../common/InvestmentChart/InvestmentChart";
import useTypedSelector from "../../hooks/useTypedSelector";

import styles from "./SinglePage.module.scss";
import Header from "../common/Header/Header";

const SinglePresentation: React.FC<{ item: MarketInfo | null }> = ({ item }) => {

  const { summary, profile } = useTypedSelector(state => state.summary);
  const { chart } = useTypedSelector(state => state.chart);
  const { positions } = useTypedSelector((state) => state.wallet);

  const owned = useMemo(() => {
    if (!item) return null;
    
    return positions.find((p) => p.symbol === item.symbol) || null;
  }, [positions, item]);

  if (!item) return null;

  const changeColor = item.change >= 0 ? "success" : "danger";
  console.log(item.currency)
  return (
    <IonPage>
      <Header title={item.symbol} />

      <IonContent className={styles.content}>
        {/* PRICE */}
        <IonCard className={styles.card}>
          <IonCardContent>
            <div className={styles.priceRow}>
              <IonText className={styles.price}>{item.price.toFixed(2)} {item.currency}</IonText>
              <IonBadge color={changeColor} className={styles.change}>
                {item.change.toFixed(2)} ({item.percent.toFixed(2)}%)
              </IonBadge>
            </div>
          </IonCardContent>
        </IonCard>
    
        {
          chart?.length > 0 && (
            <IonCard className={styles.card}>
              <IonCardContent>
                <InvestmentChart data={chart} />
              </IonCardContent>
            </IonCard>
          )
        }

        {owned && (
          <IonCard className={styles.card}>
            <IonCardContent>
              <div className={styles.ownedRow}>
                <IonText className={styles.ownedLabel}>Owned</IonText>
                <IonBadge color="success">{owned.shares} units for {owned.amount} {item.currency}</IonBadge>
              </div>

              <div className={styles.ownedProfit}>
                Profit:
                <IonBadge
                  color={
                    item.price - owned.buyPrice >= 0
                      ? "success"
                      : "danger"
                  }
                >
                  {(item.price - owned.buyPrice).toFixed(2)} {item.currency}
                </IonBadge>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* COMPANY SUMMARY */}
        {summary && (
          <IonCard className={styles.card}>
            <IonCardContent>
              <div className={styles.companyTitle}>{summary.longName}</div>

              <div className={styles.companyField}>
                Sector: <span>{summary.sector}</span>
              </div>

              <div className={styles.companyField}>
                Industry: <span>{summary.industry}</span>
              </div>

              <div className={styles.companyField}>
                Market Cap: <span>{summary.marketCap.toLocaleString()} {item.currency}</span>
              </div>

              <div className={styles.companyField}>
                Website: <a href={summary.website}>{summary.website}</a>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* PROFILE */}
        {profile && (
          <IonCard className={styles.card}>
            <IonCardContent>
              <div className={styles.companyField}>
                Address: <span>{profile.address}</span>
              </div>

              <div className={styles.companyField}>
                Employees: <span>{profile.employees}</span>
              </div>

              <div className={styles.companyField}>
                Description:
                <p className={styles.description}>{profile.description}</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SinglePresentation;