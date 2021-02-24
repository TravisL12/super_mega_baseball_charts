import React from 'react';
import { keys } from 'lodash';
import { ToggleItemLink } from './styles/FilterList.style';
import styled from 'styled-components';
import { backgroundColor } from './styles/colors';

const StyledAllNone = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0;
  gap: 10px;
  font-size: 12px;
  color: white;
  background: ${backgroundColor};
`;

const FilterAllNoneControls = ({ setFilters, filterAttr, styles = {} }) => {
  return (
    <StyledAllNone style={styles}>
      <ToggleItemLink
        onClick={() =>
          setFilters((prevFilters) => {
            const values = keys(prevFilters[filterAttr]).reduce(
              (acc, value) => {
                acc[value] = true;
                return acc;
              },
              {}
            );

            return { ...prevFilters, [filterAttr]: values };
          })
        }
      >
        All
      </ToggleItemLink>
      <ToggleItemLink
        onClick={() =>
          setFilters((prevFilters) => {
            const values = keys(prevFilters[filterAttr]).reduce(
              (acc, value) => {
                acc[value] = false;
                return acc;
              },
              {}
            );

            return { ...prevFilters, [filterAttr]: values };
          })
        }
      >
        None
      </ToggleItemLink>
    </StyledAllNone>
  );
};

export default FilterAllNoneControls;
