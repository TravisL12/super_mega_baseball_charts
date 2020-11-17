import React from 'react';
import { keys, startCase } from 'lodash';
import { positionsAbbrev } from './utilities/constants';
import FilterAllNoneControls from './FilterAllNoneControls';

const FilterList = ({ filters, setFilters, filterAttr }) => {
  return (
    <div className="filter-items">
      <div className="filter-items--title">
        <div className="title">{startCase(filterAttr)}</div>
        <FilterAllNoneControls
          setFilters={setFilters}
          filterAttr={filterAttr}
        />
      </div>
      <div className="filter-items--list">
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
            <label htmlFor={`${filterAttr}-${value}`}>
              {positionsAbbrev[value] ?? value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterList;
