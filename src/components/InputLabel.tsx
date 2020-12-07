import * as React from "react";
import styled from "styled-components";

const SLabel = styled.label`
  color: #5627df;
  font-size: 12px;
  line-height: 11px;
  font-weight: 500;
  transform: translateY(-8px);
  left: 19px;
  pointer-events: none;
  position: absolute;
  top: 16px;
  transition: 0.2s ease all;
`;

interface IProps {
  children?: React.ReactNode;
  htmlFor?: string;
}

const InputLabel = ({ children, htmlFor }: IProps) => {
  return <SLabel htmlFor={htmlFor}>{children}</SLabel>;
};

export default InputLabel;
