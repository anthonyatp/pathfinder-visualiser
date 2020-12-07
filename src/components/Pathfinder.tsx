import React from "react";
import styled from "styled-components";

import aStar from "../algorithms/aStar";
import randomMaze from "../algorithms/randomMaze";
import recursiveMaze, { walls } from "../algorithms/recursiveMaze";
import { INode } from "../types";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Node from "./Node";

const GRID_COLS = 41;
const GRID_ROWS = 21;

const INIT_START_NODE = {
  rowIdx: 9,
  colIdx: 3,
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
  colIdx: 36,
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
  align-items: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  width: 800px;
`;

const SGrid = styled.table`
  border-collapse: separate;
  border-spacing: 0px;
  border-left: 1px solid #c1c1c1;
  border-top: 1px solid #c1c1c1;
  font-family: auto;
`;

const Pathfinder = () => {
  const [startNode, setStartNode] = React.useState<INode>(INIT_START_NODE);
  const [targetNode, setTargetNode] = React.useState<INode>(INIT_TARGET_NODE);
  const [grid, setGrid] = React.useState<INode[][]>(
    getInitialGrid(GRID_COLS, GRID_ROWS, INIT_START_NODE, INIT_TARGET_NODE)
  );
  const [mouseDown, setMouseDown] = React.useState<boolean>(false);
  const [movingStart, setMovingStart] = React.useState<boolean>(false);
  const [movingTarget, setMovingTarget] = React.useState<boolean>(false);
  const [noValidPath, setNoValidPath] = React.useState<boolean>(false);
  const [animating, setAnimating] = React.useState<boolean>(false);
  const [callRecMaze, setCallRecMaze] = React.useState<boolean>(false);
  const [mazeType, setMazeType] = React.useState<string>("Recursive");
  const [algoType, setAlgoType] = React.useState<string>("A*");

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
      const newGrid = clearGrid(grid, false);
      newGrid[rowIdx][colIdx].isWall = !newGrid[rowIdx][colIdx].isWall;

      setGrid([...newGrid]);
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
      const newGrid = clearGrid(grid, false);
      if (movingStart) {
        for (const row of newGrid) {
          for (const node of row) {
            if (!target) {
              if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
                node.isStart = true;
                setStartNode(node);
              } else {
                node.isStart = false;
              }
            }
          }
        }
        setGrid([...newGrid]);
      } else if (movingTarget) {
        for (const row of newGrid) {
          for (const node of row) {
            if (!start) {
              if (node.rowIdx === rowIdx && node.colIdx === colIdx) {
                node.isTarget = true;
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
      const newGrid = clearGrid(grid, false);

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
    setNoValidPath(false);
    setAnimating(true);
    const newGrid = clearGrid(grid, true);
    const walls = randomMaze(startNode, targetNode, GRID_ROWS, GRID_COLS);
    let count = 1;
    for (const wall of walls) {
      count += 1;
      newGrid[wall[0]][wall[1]].isWall = true;
      if (count % 2 === 0 || count === walls.length) {
        setGrid([...newGrid]);
        await timer(1);
      }
    }
    setAnimating(false);
  };

  const handleRecursiveMaze = async () => {
    await timer(3);
    setCallRecMaze(true);
    setNoValidPath(false);
    setAnimating(true);
    const newGrid = clearGrid(grid, true);
    if (walls.length > 0) {
      let count = 1;
      for (const wall of walls) {
        count += 1;
        const [r, c] = wall.split(".");
        const row = parseInt(r);
        const col = parseInt(c);
        newGrid[row][col].isWall = true;
        if (count % 3 === 0 || count === walls.length) {
          setGrid([...newGrid]);
          await timer(1);
        }
      }
    }
    walls.splice(0, walls.length);
    setAnimating(false);
    setCallRecMaze(false);
  };

  React.useEffect(() => {
    if (callRecMaze) {
      const newGrid = clearGrid(grid, true);
      recursiveMaze(newGrid, startNode.rowIdx, startNode.colIdx, true);
    }
  }, [recursiveMaze, callRecMaze, clearGrid]);

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
        <Dropdown
          label="Maze type"
          options={["Random", "Recursive"]}
          selectedOption={mazeType}
          setSelectedOption={setMazeType}
          onClick={
            mazeType === "Random" ? handleRandomMaze : handleRecursiveMaze
          }
          disabled={animating}
        />
        <Dropdown
          label="Algorithm"
          options={["A*"]}
          selectedOption={algoType}
          setSelectedOption={setAlgoType}
          onClick={handleAStar}
          disabled={animating}
        />
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
                  key={`${rowIdx}${nodeIdx}`}
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

const clearGrid = (grid: INode[][], includeWalls: boolean) => {
  const newGrid = grid;
  for (const row of newGrid) {
    for (const node of row) {
      if (includeWalls && node.isWall) {
        newGrid[node.rowIdx][node.colIdx].isWall = false;
      }
      newGrid[node.rowIdx][node.colIdx].isPath = false;
      newGrid[node.rowIdx][node.colIdx].isVisited = false;
    }
  }

  return newGrid;
};

export default Pathfinder;
