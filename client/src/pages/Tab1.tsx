import { Suspense, useEffect } from 'react';

import IndexPresentation from '../components/index/Presentation';
import useActions from '../hooks/usaActions';

const Tab1: React.FC = () => {

  const { loadMarkets, getWallet } = useActions();

  useEffect(() => {
    loadMarkets(["AAPL", "MSFT", "TSLA", "NVDA", "AMZN"]);
    getWallet();
  }, []);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndexPresentation /> 
    </Suspense>
  );
};

export default Tab1;
