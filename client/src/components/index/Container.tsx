import React from "react";

import useTypedSelector from "../../hooks/useTypedSelector";
import { Container } from "../common/Container/Container";
import StocksList from "./StocksList";

interface ContainerProps {
  name: string;
}

const IndexContainer: React.FC<ContainerProps> = ({ name }) => {

  const positions = useTypedSelector(state => state.market.positions);
  const wallet = useTypedSelector(state => state.wallet);

  return (
    <Container>
        <StocksList positions={positions} wallet={wallet} />
    </Container>
  );
};

export default IndexContainer;