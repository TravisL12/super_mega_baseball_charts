import React from 'react';
import { keys, startCase } from 'lodash';

const FilterList = ({ filters, setFilters, filterAttr, small = false }) => {
  return (
    <div className={`filter-items ${small ? 'small' : ''}`}>
      <div className="title">{startCase(filterAttr)}</div>
      {!small && (
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
      )}
      <div className={`${small ? 'small-list' : ''}`}>
        {keys(filters[filterAttr]).map((value) => (
          <div
            className="filter-checkbox-container"
            key={`${filterAttr}-${value}`}
          >
            <input
              type="checkbox"
              id={`${filterAttr}-${value}`}
              checked={filters[filterAttr][value]}
              onChange={() =>
                setFilters((prevFilters) => {
                  const values = { ...prevFilters[filterAttr] };
                  values[value] = !values[value];
                  return { ...prevFilters, [filterAttr]: values };
                })
              }
            />
            <label htmlFor={`${filterAttr}-${value}`}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
