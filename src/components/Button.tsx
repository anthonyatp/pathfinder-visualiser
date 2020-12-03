import React from "react";
import styled from "styled-components";

interface IStyleProps {
  disabled?: boolean;
}

const SButton = styled.button<IStyleProps>`
  color: ${(props) => (props.disabled ? "#c0abff" : "#5627df")};
  background-color: #f5f0ff;
  border-radius: 10px;
  border: none;
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  padding: 10px 20px 10px 20px;

  :focus {
    outline-color: #5627df;
  }
`;

const SButtonText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

interface IProps extends IStyleProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick, disabled }: IProps) => (
  <SButton onClick={onClick} disabled={disabled}>
    <SButtonText>{children}</SButtonText>
  </SButton>
);

export default Button;
