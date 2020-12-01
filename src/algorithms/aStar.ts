import { INode } from "../types";

const aStar = (
  grid: INode[][],
  startNode: INode,
  targetNode: INode,
  diagonal = false
) => {
  const openNodes: INode[] = [startNode];
  const closedNodes: INode[] = [];

  while (openNodes.length > 0) {
    let currentNode = openNodes[0];
    let currentIndex = 0;
    for (const nodeIndex in openNodes) {
      if (openNodes[nodeIndex].f < currentNode.f) {
        currentNode = openNodes[nodeIndex];
        currentIndex = parseInt(nodeIndex);
      }
    }

    // remove node with lowest f score and add to closed list
    openNodes.splice(currentIndex, 1);
    closedNodes.push(currentNode);

    // If current has reached the target
    if (
      currentNode.rowIdx === targetNode.rowIdx &&
      currentNode.colIdx === targetNode.colIdx
    ) {
      let current: INode | undefined = currentNode;
      const path = [];
      while (current) {
        path.push(current);
        current = current.parent;
      }

      return { path: path.reverse(), closedNodes };
    }

    const moves = diagonal
      ? [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
        ]
      : [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ];

    // Generate neighbours
    const neighbours = [];
    for (const move of moves) {
      const newRowIdx = currentNode.rowIdx + move[0];
      const newColIdx = currentNode.colIdx + move[1];

      // new node in grid and not a wall
      if (
        newRowIdx > -1 &&
        newRowIdx < grid.length &&
        newColIdx > -1 &&
        newColIdx < grid[0].length &&
        !grid[newRowIdx][newColIdx].isWall
      ) {
        // ensure legal move (i.e. no diagonal through walls)
        if (
          (move[0] === -1 &&
            move[1] === -1 &&
            grid[newRowIdx][newColIdx + 1].isWall &&
            grid[newRowIdx + 1][newColIdx].isWall) ||
          (move[0] === -1 &&
            move[1] === 1 &&
            grid[newRowIdx][newColIdx - 1].isWall &&
            grid[newRowIdx + 1][newColIdx].isWall) ||
          (move[0] === 1 &&
            move[1] === 1 &&
            grid[newRowIdx - 1][newColIdx].isWall &&
            grid[newRowIdx][newColIdx - 1].isWall) ||
          (move[0] === 1 &&
            move[1] === -1 &&
            grid[newRowIdx - 1][newColIdx].isWall &&
            grid[newRowIdx][newColIdx + 1].isWall)
        ) {
          continue;
        } else {
          neighbours.push(grid[newRowIdx][newColIdx]);
        }
      }
    }

    // loop through neighbours
    for (const neighbour of neighbours) {
      let valid_neighbour = true;
      for (const closedNode of closedNodes) {
        if (
          closedNode.rowIdx === neighbour.rowIdx &&
          closedNode.colIdx === neighbour.colIdx
        ) {
          valid_neighbour = false;
        }
      }

      for (const openNode of openNodes) {
        if (
          openNode.rowIdx === neighbour.rowIdx &&
          openNode.colIdx === neighbour.colIdx
        ) {
          valid_neighbour = false;
        }
      }

      if (valid_neighbour) {
        neighbour.g = currentNode.g + 1;
        neighbour.h =
          (neighbour.rowIdx - targetNode.rowIdx) ** 2 +
          (neighbour.colIdx - targetNode.colIdx) ** 2;
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.parent = currentNode;

        openNodes.push(neighbour);
      }
    }
  }

  return { path: undefined, openNodes: undefined };
};

export default aStar;
