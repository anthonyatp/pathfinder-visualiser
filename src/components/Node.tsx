import React from "react";
import styled, { css } from "styled-components";

interface IStyleProps {
  isWall: boolean;
}

interface IProps extends IStyleProps {
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
}

const WALL_COLOR = "#34495e";

const SNode = styled.td<IStyleProps>`
  background-color: ${(props) => (props.isWall ? WALL_COLOR : "white")};
  border-right: ${(props) =>
    props.isWall ? `1px solid ${WALL_COLOR}` : "1px solid grey"};
  border-bottom: ${(props) =>
    props.isWall ? `1px solid ${WALL_COLOR}` : "1px solid grey"};
  display: inline-block;
  height: 25px;
  width: 25px;
`;

const Node = ({ onMouseDown, onMouseEnter, onMouseUp, isWall }: IProps) => {
  return (
    <SNode
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
      isWall={isWall}
    />
  );
};

export default Node;
