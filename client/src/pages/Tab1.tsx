import { Suspense, useEffect } from 'react';

import IndexPresentation from '../components/index/Presentation';
import useActions from '../hooks/usaActions';

const Tab1: React.FC = () => {

  const { loadMarkets, init } = useActions();

  useEffect(() => {
    
    loadMarkets();
    init();

    return () => {
      console.log("unload markets")
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndexPresentation /> 
    </Suspense>
  );
};

export default Tab1;
