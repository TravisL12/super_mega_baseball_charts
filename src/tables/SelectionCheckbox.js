import React from 'react';
import { StyledSelectionCheckbox } from '../styles/Table.style';

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
