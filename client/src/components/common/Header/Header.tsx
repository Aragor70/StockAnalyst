import { IonHeader, IonToolbar, IonButtons, IonIcon } from "@ionic/react";
import { personCircleOutline, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import HeaderAccordion from "./HeaderAccordion";
import SearchAccordion from "../SearchAccordion/SearchAccordion";

const Header: React.FC<{ title?: string }> = ({ title }) => {

    const history = useHistory();

    const [searchOpen, setSearchOpen] = useState(false);
    
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start" onClick={() => history.push("/profile")}>
                    <IonIcon icon={personCircleOutline} size="large" />
                </IonButtons>
                {
                    title ? title : (
                        <HeaderAccordion
                            total={12450}
                            invested={10000}
                        />
                    )
                }

                <IonButtons slot="end">
                    <IonIcon
                        icon={searchOutline}
                        size="large"
                        onClick={() => setSearchOpen((prev) => !prev)}
                    />
                </IonButtons>

            </IonToolbar>

            {searchOpen && (
                <SearchAccordion
                    onSelect={(symbol) => {
                        setSearchOpen(false);
                        history.push(`/single/${symbol}`);
                    }}
                />
            )}
        </IonHeader>
    );
};

export default Header;