import React from "react";
import styled from "styled-components";

import Node from "./components/Node";

const INIT_START_NODE = {
  rowIdx: 9,
  colIdx: 4,
  isWall: false,
  isStart: true,
  isTarget: false,
  distance: Infinity,
};

const INIT_TARGET_NODE = {
  rowIdx: 9,
  colIdx: 35,
  isWall: false,
  isStart: false,
  isTarget: true,
  distance: Infinity,
};

const SContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SGrid = styled.table`
  border-collapse: separate;
  border-spacing: 0px;
  margin: 30px;
  border-left: 1px solid grey;
  border-top: 1px solid grey;
`;

const App = () => {
  const [startNode, setStartNode] = React.useState(INIT_START_NODE);
  const [targetNode, setTargetNode] = React.useState(INIT_TARGET_NODE);
  const [grid, setGrid] = React.useState(
    getInitialGrid(40, 20, startNode, targetNode)
  );
  const [mouseDown, setMouseDown] = React.useState(false);
  const [movingStart, setMovingStart] = React.useState(false);
  const [movingTarget, setMovingTarget] = React.useState(false);

  const handleMouseDown = (
    rowIdx: number,
    colIdx: number,
    start: boolean,
    target: boolean
  ) => {
    if (start) {
      setMovingStart(true);
    } else if (target) {
      setMovingTarget(true);
    } else {
      const newGrid = [...grid];
      newGrid[rowIdx][colIdx].isWall = !newGrid[rowIdx][colIdx].isWall;

      setGrid(newGrid);
    }
    setMouseDown(true);
  };

  const handleMouseEnter = (rowIdx: number, colIdx: number) => {
    if (mouseDown) {
      if (movingStart) {
        const newGrid = [...grid];
        for (const row of newGrid) {
          for (const node of row) {
            if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
              node.isStart = true;
              node.isWall = false;
              setStartNode(node);
            } else {
              node.isStart = false;
            }
          }
        }
        setGrid(newGrid);
      } else if (movingTarget) {
        const newGrid = [...grid];
        for (const row of newGrid) {
          for (const node of row) {
            if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
              node.isTarget = true;
              node.isWall = false;
              setTargetNode(node);
            } else {
              node.isTarget = false;
            }
          }
        }
        setGrid(newGrid);
      } else {
        if (startNode.rowIdx !== rowIdx || targetNode.rowIdx !== rowIdx) {
          const newGrid = [...grid];
          newGrid[rowIdx][colIdx].isWall = !newGrid[rowIdx][colIdx].isWall;

          setGrid(newGrid);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMovingStart(false);
    setMovingTarget(false);
  };

  return (
    <SContainer>
      <SGrid>
        {grid.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                onMouseDown={() =>
                  handleMouseDown(
                    node.rowIdx,
                    node.colIdx,
                    node.isStart,
                    node.isTarget
                  )
                }
                onMouseEnter={() => handleMouseEnter(node.rowIdx, node.colIdx)}
                onMouseUp={handleMouseUp}
                isWall={node.isWall}
                isStart={node.isStart}
                isTarget={node.isTarget}
              />
            ))}
          </tr>
        ))}
      </SGrid>
    </SContainer>
  );
};

const getInitialGrid = (
  columns: number,
  rows: number,
  startPosition: { rowIdx: number; colIdx: number },
  targetPosition: { rowIdx: number; colIdx: number }
) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < columns; col++) {
      currentRow.push(createNode(col, row, startPosition, targetPosition));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  colIdx: number,
  rowIdx: number,
  startPosition: { rowIdx: number; colIdx: number },
  targetPosition: { rowIdx: number; colIdx: number }
) => {
  return {
    colIdx,
    rowIdx,
    isWall: false,
    isStart: rowIdx === startPosition.rowIdx && colIdx === startPosition.colIdx,
    isTarget:
      rowIdx === targetPosition.rowIdx && colIdx === targetPosition.colIdx,
    distance: Infinity,
  };
};

export default App;
