

import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";

import useActions from "../hooks/usaActions";
import SinglePresentation from "../components/single/Presentation";
import useTypedSelector from "../hooks/useTypedSelector";

const SinglePage: React.FC = () => {

  const { symbol } = useParams<{ symbol: string }>();

  const { loadMarkets, getWallet, init, loadChart } = useActions();
  const market = useTypedSelector((state) => state.market);

  useEffect(() => {

    loadChart(symbol)
    loadMarkets([symbol]);
    getWallet();
    init();

    return () => {
      console.log("unload markets")
    }
  }, [symbol])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SinglePresentation item={market.positions[0]} />
    </Suspense>
  );
};

export default SinglePage;