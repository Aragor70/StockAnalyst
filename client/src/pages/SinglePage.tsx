

import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";

import useActions from "../hooks/usaActions";
import SinglePresentation from "../components/single/Presentation";

const SinglePage: React.FC = () => {

  const { symbol } = useParams<{ symbol: string }>();

  const { loadMarket, getWallet } = useActions();

  useEffect(() => {
    loadMarket(symbol);
    getWallet();
  }, [symbol]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SinglePresentation />
    </Suspense>
  );
};

export default SinglePage;