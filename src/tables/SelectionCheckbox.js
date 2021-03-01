import React from 'react';
import styled from 'styled-components';
import { highlightGray, speedColor } from '../styles/colors';

export const StyledSelectionCheckbox = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  label {
    cursor: pointer;
    width: 100%;
    text-transform: lowercase;
    font-weight: 500;

    .checkbox-label {
      display: block;
      margin: 0 auto;
      width: 25px;
      height: 25px;
      cursor: pointer;
      background: ${highlightGray};
      box-shadow: inset 0 0 0px 1px black;
      color: white;
    }
  }

  input[type='checkbox']:checked + label .checkbox-label {
    background: ${speedColor};
    box-shadow: inset 0 0 0px 1px white;

    &:after {
      content: '\\2715';
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
`;

const SelectionCheckbox = ({ id, onChange, isChecked, value }) => {
  return (
    <StyledSelectionCheckbox>
      <input
        id={id}
        value={value}
        checked={isChecked}
        type="checkbox"
        onChange={onChange}
      />
      <label htmlFor={id}>
        <div className="checkbox-label"></div>
      </label>
    </StyledSelectionCheckbox>
  );
};

export default SelectionCheckbox;
