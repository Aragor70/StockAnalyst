import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonModal,
  IonContent
} from "@ionic/react";
import { useRef, useState } from "react";
import InvestmentChart from "../InvestmentChart/InvestmentChart";

interface HeaderAccordionProps {
  total: number;
  invested: number;
  history: number[];
}

const HeaderAccordion: React.FC<HeaderAccordionProps> = ({
  total,
  invested,
  history
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const profit = total - invested;

  return (
    <>
      <div ref={ref}>
        <IonAccordionGroup>
          <IonAccordion value="amount" onClick={() => setIsOpen(true)}>
            <IonItem slot="header" lines="none">
              <IonLabel className="ion-text-center">
                <div style={{ fontSize: "18px", fontWeight: 700 }}>
                  {total.toLocaleString()} zł
                </div>
                <div style={{ fontSize: "13px", opacity: 0.7 }}>
                  Profit: {profit.toLocaleString()} zł
                </div>
              </IonLabel>
            </IonItem>
          </IonAccordion>
        </IonAccordionGroup>
      </div>

      <IonModal
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        presentingElement={ref.current!}
        breakpoints={[0, 0.4, 0.9]}
        initialBreakpoint={0.9}
      >
        <IonContent className="ion-padding">

          <h2 style={{ marginTop: 0 }}>Szczegóły inwestycji</h2>

          <div style={{ marginBottom: "20px" }}>
            <InvestmentChart history={history} />
          </div>

          <div style={{ fontSize: "18px", marginBottom: "10px" }}>
            Zainwestowano: <b>{invested.toLocaleString()} zł</b>
          </div>

          <div style={{ fontSize: "18px", marginBottom: "10px" }}>
            Aktualna wartość: <b>{total.toLocaleString()} zł</b>
          </div>

          <div style={{ fontSize: "18px" }}>
            Profit: <b>{profit.toLocaleString()} zł</b>
          </div>

        </IonContent>
      </IonModal>
    </>
  );
};

export default HeaderAccordion;