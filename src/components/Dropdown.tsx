import * as React from "react";
import styled from "styled-components";

import InputLabel from "./InputLabel";
import Play from "./svg/Play";

interface IStyleProps {
  disabled: boolean;
}

interface IProps extends IStyleProps {
  label?: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  onClick: () => void;
}

const SDiv = styled.div`
  align-items: center;
  display: inline-flex;
  margin-left: 36px;
  position: relative;
  width: 200px;
`;

const SDropdown = styled.div<IStyleProps>`
  align-items: center;
  display: flex;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: #f5f0ff;
  border: solid 1px #5627df;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(45deg, transparent 50%, #5627df 50%),
    linear-gradient(135deg, #5627df 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 5px),
    calc(100% - 15px) calc(1em + 5px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  height: 35px;
  padding: 12px 0 0 18px;
  width: 100%;
  user-select: none;

  :focus {
    outline: none;
  }
`;

const SCircle = styled.div<IStyleProps>`
  display: flex;
  align-items: center;
  position: absolute;
  left: -20%;
  z-index: 1;
  border: 5px solid #fdf9fb;
  background-color: #5627df;
  border-radius: 50%;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  height: 45px;
  justify-content: center;
  line-height: 45px;
  text-align: center;
  width: 45px;
`;

const SList = styled.ul`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin: 0;
  max-height: 150px;
  overflow: auto;
  padding: 0;
  position: absolute;
  text-align: left;
  width: 100%;
  top: 49px;
  z-index: 1;

  & > *:last-child {
    border-bottom: none;
  }
`;

const SListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  display: flex;
  height: 40px;
  padding-left: 18px;
  user-select: none;

  :hover {
    background-color: #efefef;
  }
`;

const Dropdown = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
  onClick,
  disabled,
}: IProps) => {
  const [selected, setSelected] = React.useState(true);

  React.useEffect(() => {
    setSelected(true);
  }, [disabled]);

  const handleItemClick = (option: string) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
    setSelected(true);
  };

  return (
    <SDiv>
      <SCircle
        disabled={disabled}
        onClick={
          disabled
            ? () => {
                return;
              }
            : onClick
        }
      >
        <Play fill={disabled ? "#c0abff" : "white"} />
      </SCircle>
      <SDropdown
        onClick={() =>
          disabled
            ? () => {
                return;
              }
            : setSelected(!selected)
        }
        disabled={disabled}
      >
        {selectedOption}
      </SDropdown>
      {!selected && (
        <SList>
          {options.map((option: string, index: number) => (
            <SListItem
              key={index}
              value={option}
              onClick={() => handleItemClick(option)}
            >
              {option}
            </SListItem>
          ))}
        </SList>
      )}
      <InputLabel>{label}</InputLabel>
    </SDiv>
  );
};

export default Dropdown;
