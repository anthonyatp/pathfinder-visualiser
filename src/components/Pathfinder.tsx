import React from "react";
import styled from "styled-components";

import aStar from "../algorithms/aStar";
import randomMaze from "../algorithms/randomMaze";
import Button from "./Button";
import Node, { BORDER_COLOR } from "./Node";

const GRID_COLS = 40;
const GRID_ROWS = 20;

const INIT_START_NODE = {
  rowIdx: 9,
  colIdx: 4,
  isWall: false,
  isStart: true,
  isTarget: false,
  g: 0,
  h: 0,
  f: 0,
  parent: undefined,
  isPath: false,
  isVisited: false,
};

const INIT_TARGET_NODE = {
  rowIdx: 9,
  colIdx: 35,
  isWall: false,
  isStart: false,
  isTarget: true,
  g: 0,
  h: 0,
  f: 0,
  parent: undefined,
  isPath: false,
  isVisited: false,
};

const SButtonWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const SGrid = styled.table`
  border-collapse: separate;
  border-spacing: 0px;
  border-left: 1px solid ${BORDER_COLOR};
  border-top: 1px solid ${BORDER_COLOR};
`;

const Pathfinder = () => {
  const [startNode, setStartNode] = React.useState(INIT_START_NODE);
  const [targetNode, setTargetNode] = React.useState(INIT_TARGET_NODE);
  const [grid, setGrid] = React.useState(
    getInitialGrid(GRID_COLS, GRID_ROWS, INIT_START_NODE, INIT_TARGET_NODE)
  );
  const [mouseDown, setMouseDown] = React.useState(false);
  const [movingStart, setMovingStart] = React.useState(false);
  const [movingTarget, setMovingTarget] = React.useState(false);
  const [noValidPath, setNoValidPath] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

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

  const handleMouseEnter = (
    rowIdx: number,
    colIdx: number,
    start: boolean,
    target: boolean
  ) => {
    if (mouseDown) {
      if (movingStart) {
        const newGrid = grid;
        for (const row of newGrid) {
          for (const node of row) {
            if (!target) {
              if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
                node.isStart = true;
                node.isWall = false;
                setStartNode(node);
              } else {
                node.isStart = false;
              }
            }
          }
        }
        setGrid([...newGrid]);
      } else if (movingTarget) {
        const newGrid = grid;
        for (const row of newGrid) {
          for (const node of row) {
            if (!start) {
              if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
                node.isTarget = true;
                node.isWall = false;
                setTargetNode(node);
              } else {
                node.isTarget = false;
              }
            }
          }
        }
        setGrid([...newGrid]);
      } else {
        if (
          !(startNode.rowIdx === rowIdx && startNode.colIdx === colIdx) ||
          !(targetNode.rowIdx === rowIdx && targetNode.colIdx === colIdx)
        ) {
          const newGrid = grid;
          newGrid[rowIdx][colIdx].isWall = true;

          setGrid([...newGrid]);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMovingStart(false);
    setMovingTarget(false);
  };

  const timer = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const handleAStar = async () => {
    const { path, closedNodes } = aStar(grid, startNode, targetNode);
    if (path && closedNodes) {
      setAnimating(true);
      setNoValidPath(false);
      const newGrid = grid;

      for (const closedNode of closedNodes) {
        newGrid[closedNode.rowIdx][closedNode.colIdx].isVisited = true;
        setGrid([...newGrid]);
        await timer(10);
      }

      for (const node of path) {
        newGrid[node.rowIdx][node.colIdx].isPath = true;
        setGrid([...newGrid]);
        await timer(3);
      }
      setAnimating(false);
    } else {
      setNoValidPath(true);
    }
  };

  const handleRandomMaze = async () => {
    setAnimating(true);
    const walls = randomMaze(startNode, targetNode, GRID_ROWS, GRID_COLS);
    const newGrid = grid;
    for (const wall of walls) {
      newGrid[wall[0]][wall[1]].isWall = true;
      setGrid([...newGrid]);
      await timer(0.5);
    }
    setAnimating(false);
  };

  const handleResetGrid = () => {
    setStartNode(INIT_START_NODE);
    setTargetNode(INIT_TARGET_NODE);
    setGrid(
      getInitialGrid(GRID_COLS, GRID_ROWS, INIT_START_NODE, INIT_TARGET_NODE)
    );
    setNoValidPath(false);
    setAnimating(false);
  };

  return (
    <>
      <SButtonWrapper>
        <Button disabled={animating} onClick={handleRandomMaze}>
          Generate Random Maze
        </Button>
        <Button disabled={animating} onClick={handleAStar}>
          Visualise A* Algorithm
        </Button>
        <Button disabled={animating} onClick={handleResetGrid}>
          Reset Grid
        </Button>
      </SButtonWrapper>
      <SGrid>
        <tbody>
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
                  onMouseEnter={() =>
                    handleMouseEnter(
                      node.rowIdx,
                      node.colIdx,
                      node.isStart,
                      node.isTarget
                    )
                  }
                  onMouseUp={handleMouseUp}
                  disabled={animating}
                  isWall={node.isWall}
                  isStart={node.isStart}
                  isTarget={node.isTarget}
                  isPath={node.isPath}
                  isVisited={node.isVisited}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </SGrid>
      {noValidPath && <p>No valid path found</p>}
    </>
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
    g: 0,
    h: 0,
    f: 0,
    parent: undefined,
    isPath: false,
    isVisited: false,
  };
};

export default Pathfinder;
