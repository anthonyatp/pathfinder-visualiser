import React from "react";
import styled from "styled-components";

import Pathfinder from "./components/Pathfinder";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

const SHeader = styled.h1`
`

const App = () => {

  return (
    <SContainer>
      <SHeader>Pathfinder Visualiser</SHeader>
      <Pathfinder />
    </SContainer>
  );
};

export default App;
