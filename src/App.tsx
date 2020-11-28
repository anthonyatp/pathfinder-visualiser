import React from "react";
import styled from "styled-components";

import Node from "./components/Node";

const SGrid = styled.table`
  border-collapse: separate;
  border-spacing: 0px;
  margin: 5rem;
  border-left: 1px solid grey;
  border-top: 1px solid grey;
`;

function App() {
  const [grid, setGrid] = React.useState(getInitialGrid(40, 20));
  const [mouseDown, setMouseDown] = React.useState(false);

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col].isWall = !newGrid[row][col].isWall;

    setGrid(newGrid);
    setMouseDown(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (mouseDown) {
      const newGrid = [...grid];
      newGrid[row][col].isWall = !newGrid[row][col].isWall;

      setGrid(newGrid);
    }
  };

  return (
    <SGrid>
      {grid.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {row.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={() => setMouseDown(false)}
              isWall={node.isWall}
            />
          ))}
        </tr>
      ))}
    </SGrid>
  );
}

const getInitialGrid = (columns: number, rows: number) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < columns; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isWall: false,
  };
};

export default App;
