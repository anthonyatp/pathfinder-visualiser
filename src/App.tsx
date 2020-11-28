import React from 'react';
import styled from "styled-components";

const GRID_COLUMNS = 30;
const GRID_ROWS = 30;

const SDiv = styled.div`
  padding: 3rem;
`;

const SGrid = styled.div`
  display: grid;
  grid-template: repeat(${GRID_ROWS}, 1fr) / repeat(${GRID_COLUMNS}, 1fr);
  gap: 0px;
  width: 30rem;
  height: 30rem;
`;

const SNode = styled.div`
  border: 1px solid blue;
`;

function App() {
  const gridArray = Array.from(Array(GRID_COLUMNS * GRID_ROWS))

  return (
    <SDiv>
      Yoooo
      <SGrid>
        {gridArray.map((_, i) => <SNode key={i}>{i}</SNode>)}
      </SGrid>
    </SDiv>
  );
}

export default App;
