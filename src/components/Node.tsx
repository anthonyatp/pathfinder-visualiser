import React from "react";
import styled, { css } from "styled-components";

interface IStyleProps {
  isWall: boolean;
  isStart: boolean;
  isTarget: boolean;
  isPath: boolean;
}

interface IProps extends IStyleProps {
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

const WALL_COLOR = "#34495e";
const START_COLOR = "green";
const TARGET_COLOR = "red";

const wallNode = css`
  background-color: ${WALL_COLOR};
  border-right: 1px solid ${WALL_COLOR};
  border-bottom: 1px solid ${WALL_COLOR};
`;

const startNode = css`
  background-color: ${START_COLOR};
  border-right: 1px solid ${START_COLOR};
  border-bottom: 1px solid ${START_COLOR};
`;

const targetNode = css`
  background-color: ${TARGET_COLOR};
  border-right: 1px solid ${TARGET_COLOR};
  border-bottom: 1px solid ${TARGET_COLOR};
`;

const SNode = styled.td<IStyleProps>`
  background-color: white;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  display: inline-block;
  height: 20px;
  width: 20px;

  ${(props) =>
    (props.isStart && startNode) ||
    (props.isPath && startNode) ||
    (props.isTarget && targetNode) ||
    (props.isWall && wallNode)}
`;

const Node = ({
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isWall,
  isStart,
  isTarget,
  isPath,
}: IProps) => {
  return (
    <SNode
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      isWall={isWall}
      isStart={isStart}
      isTarget={isTarget}
      isPath={isPath}
    />
  );
};

export default Node;
