import React, { useState } from 'react';
import { keys, startCase } from 'lodash';
import { positionsAbbrev } from './utilities/constants';
import FilterAllNoneControls from './FilterAllNoneControls';
import { FilterDropdownContainer } from './styles/FilterList.style';

const FilterDropdown = ({ filters, setFilters, filterAttr }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  return (
    <FilterDropdownContainer>
      <div className="filter-items--title">
        <div className="title">{startCase(filterAttr)}</div>
        <FilterAllNoneControls
          setFilters={setFilters}
          filterAttr={filterAttr}
        />
      </div>
      <div className="dropdown">
        <div
          className="select"
          onClick={() => setShowCheckboxes(!showCheckboxes)}
        >
          <select>
            <option>{startCase(filterAttr)}</option>
          </select>
          <div className="overSelect"></div>
        </div>

        {showCheckboxes && (
          <div className="checkbox-list">
            {keys(filters[filterAttr]).map((value) => (
              <div key={`${filterAttr}-${value}`}>
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
        )}
      </div>
    </FilterDropdownContainer>
  );
};

export default FilterDropdown;
