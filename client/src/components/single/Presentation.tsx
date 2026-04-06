import { IonPage, IonContent, IonCard, IonCardContent, IonBadge, IonText } from "@ionic/react";
import { useMemo } from "react";

import InvestmentChart from "../common/InvestmentChart/InvestmentChart";
import useTypedSelector from "../../hooks/useTypedSelector";
import Header from "../common/Header/Header";

import styles from "./SinglePage.module.scss";

const SinglePresentation: React.FC = () => {

  const { summary, more } = useTypedSelector(state => state.summary);
  const { chart } = useTypedSelector(state => state.chart);
  const { loading, positions } = useTypedSelector((state) => state.market);
  const { positions: walletPositions } = useTypedSelector((state) => state.wallet);

  const owned = useMemo(() => {
    if (!positions[0]) return null;
    
    return walletPositions.find((p) => p.symbol === positions[0].symbol) || null;
  }, [positions]);
  
  if (loading) {
    return "Loading...";
  }

  if (!positions.length || loading) return null;

  const changeColor = positions[0].change >= 0 ? "success" : "danger";

  return (
    <IonPage>
      <Header title={positions[0].symbol} />

      <IonContent className={styles.content}>
        {/* PRICE */}
        <IonCard className={styles.card}>
          <IonCardContent>
            <div className={styles.priceRow}>
              <IonText className={styles.price}>{positions[0].price.toFixed(2)} {positions[0].currency}</IonText>
              <IonBadge color={changeColor} className={styles.change}>
                {positions[0].change.toFixed(2)} ({positions[0].percent.toFixed(2)}%)
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
                <IonBadge color="success">{Number(owned.shares).toFixed(3)} units for {owned.amount} {positions[0].currency}</IonBadge>
              </div>

              <div className={styles.ownedProfit}>
                Profit:
                <IonBadge
                  color={
                    positions[0].price - owned.buyPrice >= 0
                      ? "success"
                      : "danger"
                  }
                >
                  {(positions[0].price - owned.buyPrice).toFixed(2)} {positions[0].currency}
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
                Market Cap:{" "}
                <span>
                  {summary.marketCap?.toLocaleString()} {positions[0].currency ?? "USD"}
                </span>
              </div>

              <div className={styles.companyField}>
                Website:{" "}
                <a href={summary.website} target="_blank" rel="noopener noreferrer">
                  {summary.website}
                </a>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* PROFILE */}
        {more && (
          <IonCard className={styles.card}>
            <IonCardContent>
              <div className={styles.companyField}>
                Address: <span>{more.address}</span>
              </div>

              <div className={styles.companyField}>
                Employees: <span>{more.employees?.toLocaleString()}</span>
              </div>

              <div className={styles.companyField}>
                Description:
                <p className={styles.description}>{more.description}</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

      </IonContent>
    </IonPage>
  );
};

export default SinglePresentation;