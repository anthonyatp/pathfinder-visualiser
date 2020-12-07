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
  line-height: 1;
  margin-bottom: 20px;
`;

const SDescription = styled.p`
  color: #6b6c73;
  font-family: "Poppins", sans-serif;
  margin-bottom: 20px;
  margin-top: 0;
`;

const App = () => {
  return (
    <SContainer>
      <SHeader>Pathfinder Visualiser</SHeader>
      <SDescription>
        Visualise algorithms that calculate the shortest path between two
        points.
      </SDescription>
      <Pathfinder />
    </SContainer>
  );
};

export default App;
