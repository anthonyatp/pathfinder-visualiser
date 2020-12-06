import * as React from "react";
import styled, { css } from "styled-components";

interface IProps {
  className?: string;
  fill?: string;
}

const SStart = styled.svg<IProps>`
  ${(props) =>
    props.fill &&
    css`
      fill: ${props.fill};
    `}
`;

const Start = ({ className, fill }: IProps) => {
  return (
    <SStart
      className={className}
      fill={fill}
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path d="M8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6 12v-8l6 4-6 4z"></path>
    </SStart>
  );
};

export default Start;
