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

const App = () => {
  return (
    <SContainer>
      <h1>Pathfinder Visualiser</h1>
      <Pathfinder />
    </SContainer>
  );
};

export default App;
