import React from "react";
import styled from "styled-components";
import Reset from "./svg/Reset";

interface IStyleProps {
  disabled?: boolean;
}

const SButton = styled.button<IStyleProps>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.disabled ? "#c0abff" : "white")};
  background-color: #5627df;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  height: 50px;
  padding: 10px 20px 10px 20px;

  :focus {
    outline: none;
  }
`;

const SButtonText = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const SReset = styled(Reset)`
  margin-left: 10px;
`;

interface IProps extends IStyleProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick, disabled }: IProps) => (
  <SButton onClick={onClick} disabled={disabled}>
    <SButtonText>{children}</SButtonText>
    <SReset fill={disabled ? "#c0abff" : "white"} />
  </SButton>
);

export default Button;
