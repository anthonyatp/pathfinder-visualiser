export interface INode {
  rowIdx: number;
  colIdx: number;
  isWall: boolean;
  isStart: boolean;
  isTarget: boolean;
  isPath: boolean;
  isVisited: boolean;
  g: number;
  h: number;
  f: number;
  parent?: INode;
}
