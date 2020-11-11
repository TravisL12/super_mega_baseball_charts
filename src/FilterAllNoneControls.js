import React from 'react';
import { keys } from 'lodash';

const FilterAllNoneControls = ({ small, setFilters, filterAttr }) => {
  return (
    !small && (
      <div className="all-none-filters">
        <div
          className="toggle-all-items"
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
        </div>
        <div
          className="toggle-all-items"
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
        </div>
      </div>
    )
  );
};

export default FilterAllNoneControls;
