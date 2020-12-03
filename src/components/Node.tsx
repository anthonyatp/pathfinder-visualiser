import React from "react";

import Start from "./svg/Start";
import Target from "./svg/Target";
import "./Node.css";

interface IProps {
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
  disabled: boolean;
  isWall: boolean;
  isStart: boolean;
  isTarget: boolean;
  isPath: boolean;
  isVisited: boolean;
}

const Node = ({
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  disabled,
  isWall,
  isStart,
  isTarget,
  isPath,
  isVisited,
}: IProps) => {
  let className = "node";
  if (isStart) {
    className = "node-start";
  } else if (isPath) {
    className = "node-path";
  } else if (isVisited) {
    className = "node-visited";
  } else if (isTarget) {
    className = "node-target";
  } else if (isWall) {
    className = "node-wall";
  }

  return (
    <td
      className={className}
      onMouseDown={
        disabled
          ? () => {
              return;
            }
          : onMouseDown
      }
      onMouseEnter={
        disabled
          ? () => {
              return;
            }
          : onMouseEnter
      }
      onMouseUp={
        disabled
          ? () => {
              return;
            }
          : onMouseUp
      }
    >
      {isTarget && <Target fill="#ffffff" />}
      {isStart && <Start fill="#ffffff" />}
    </td>
  );
};

export default Node;
