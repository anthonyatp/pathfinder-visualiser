import * as React from "react";
import styled, { css } from "styled-components";

interface IProps {
  className?: string;
  fill?: string;
}

const SReset = styled.svg<IProps>`
  ${(props) =>
    props.fill &&
    css`
      fill: ${props.fill};
    `}
`;

const Reset = ({ className, fill }: IProps) => {
  return (
    <SReset
      className={className}
      fill={fill}
      width="20"
      height="20"
      viewBox="0 0 28.265 28.265"
    >
      <path
        d="M14.133,28.265c-7.061,0-12.805-5.75-12.805-12.809c0-7.06,5.744-12.807,12.805-12.807c0.469,0,0.943,0.027,1.414,0.08
		v-2.07c0-0.266,0.164-0.508,0.406-0.611c0.252-0.098,0.531-0.043,0.723,0.148l4.537,4.547c0.258,0.258,0.258,0.67,0,0.932
		l-4.535,4.557c-0.193,0.188-0.473,0.246-0.725,0.143c-0.242-0.104-0.406-0.344-0.406-0.609V7.47
		c-0.469-0.086-0.941-0.125-1.414-0.125c-4.473,0-8.113,3.639-8.113,8.111c0,4.471,3.641,8.113,8.113,8.113s8.111-3.643,8.111-8.113
		c0-0.363,0.295-0.66,0.662-0.66h3.369c0.365,0,0.662,0.297,0.662,0.66C26.937,22.515,21.189,28.265,14.133,28.265z"
      />
    </SReset>
  );
};

export default Reset;
