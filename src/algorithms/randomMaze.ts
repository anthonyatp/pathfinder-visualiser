import { INode } from "../types";

const randomMaze = (
  startNode: INode,
  targetNode: INode,
  grid_rows: number,
  grid_cols: number
) => {
  const nodes = grid_rows * grid_cols - 2;
  const gridCovered = 0.3;
  const totalWalls = nodes * gridCovered;

  const availableGridPositions = [];
  for (let i = 0; i < grid_rows; i++) {
    for (let j = 0; j < grid_cols; j++) {
      if (
        (i === startNode.rowIdx && j === startNode.colIdx) ||
        (i === targetNode.rowIdx && j === targetNode.colIdx)
      ) {
        continue;
      } else {
        availableGridPositions.push([i, j]);
      }
    }
  }

  const walls = getRandom(availableGridPositions, totalWalls);

  return walls;
};

const getRandom = (arr: number[][], n: number) => {
  const walls = [];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * arr.length);
    const randomElement = arr[index];
    walls.push(randomElement);
    arr.splice(index, 1);
  }

  return walls;
};

export default randomMaze;
