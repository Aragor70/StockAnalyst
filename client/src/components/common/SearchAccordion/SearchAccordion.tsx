import { useState, useEffect } from "react";
import { IonSearchbar, IonList, IonItem, IonLabel } from "@ionic/react";

import SearchService from "../../../services/searchService";

import styles from "./SearchAccordion.module.scss";

const searchService = SearchService.getInstance();

const SearchAccordion: React.FC<{
  onSelect: (symbol: string) => void;
}> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 0) {
        searchService.searchTickers({ symbol: query }).then((res) => {
          setResults(res || []);
        });
      } else {
        setResults([]);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className={styles.accordion}>
      <IonSearchbar
        value={query}
        onIonInput={(e) => setQuery(e.detail.value!)}
        placeholder={"Search symbol..."}
        className={styles.search}
      />

      <IonList className={styles.list}>
        {results.map((item) => (
          <IonItem
            key={item.symbol}
            button
            onClick={() => onSelect(item.symbol)}
            className={styles.item}
          >
            <IonLabel>{item.symbol}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default SearchAccordion;