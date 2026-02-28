import React from "react";

import useTypedSelector from "../../hooks/useTypedSelector";
import { Container } from "../common/Container/Container";
import StocksList from "./StocksList";

interface ContainerProps {
  name: string;
}

const IndexContainer: React.FC<ContainerProps> = ({ name }) => {

  const positions = useTypedSelector(state => state.market.positions);

  return (
    <Container>
        
        <StocksList data={positions} />
    </Container>
  );
};

export default IndexContainer;