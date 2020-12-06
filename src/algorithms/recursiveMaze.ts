import { INode } from "../types";

export const walls: string[] = [];

const recursiveMaze = (
  grid: INode[][],
  startRowIdx: number,
  startColIdx: number,
  fillWalls: boolean
) => {
  // Fill Grid with walls
  if (fillWalls) {
    for (const row of grid) {
      for (const node of row) {
        node.isWall = true;
        walls.push(`${node.rowIdx}.${node.colIdx}`);
      }
    }
  }

  grid[startRowIdx][startColIdx].isWall = false;
  removeWall(startRowIdx, startColIdx);

  let moves = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  moves = shuffle(moves);

  while (moves.length > 0) {
    const potentialMove = moves.pop();
    // calculate the new node's coordinates using our random direction.
    // we *2 as we are moving two cells in each direction to the next node
    const newRowIdx = startRowIdx + potentialMove![0] * 2;
    const newColIdx = startColIdx + potentialMove![1] * 2;

    if (
      newRowIdx > -1 &&
      newRowIdx < grid.length &&
      newColIdx > -1 &&
      newColIdx < grid[0].length &&
      grid[newRowIdx][newColIdx].isWall
    ) {
      const linkNodeRowIdx = startRowIdx + potentialMove![0];
      const linkNodeColIdx = startColIdx + potentialMove![1];
      grid[linkNodeRowIdx][linkNodeColIdx].isWall = false;
      removeWall(linkNodeRowIdx, linkNodeColIdx);

      recursiveMaze(grid, newRowIdx, newColIdx, false);
    }
  }
};

const removeWall = (rowIdx: number, colIdx: number) => {
  const index = walls.indexOf(`${rowIdx}.${colIdx}`);
  walls.splice(index, 1);
};

const shuffle = (arr: number[][]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default recursiveMaze;
