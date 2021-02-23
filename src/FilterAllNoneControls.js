import React from 'react';
import { keys } from 'lodash';
import { ToggleItemLink } from './styles/FilterList.style';

const FilterAllNoneControls = ({ setFilters, filterAttr, styles = {} }) => {
  return (
    <div className="all-none-filters" style={styles}>
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
    </div>
  );
};

export default FilterAllNoneControls;
