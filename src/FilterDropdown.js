import React, { useState } from 'react';
import { keys, startCase } from 'lodash';
import { positionsAbbrev } from './utilities/constants';
import FilterAllNoneControls from './FilterAllNoneControls';
import {
  FilterDropdownContainer,
  FilterPortalDropdown,
} from './styles/FilterList.style';
import Portal from './FilterPortal';
import { usePortal } from './hooks/usePortal';

const FilterDropdown = ({ filters, setFilters, filterAttr }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal();

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
        <button
          className="select"
          onClick={(e) => {
            setPortalCoordinates(e);
            setShowCheckboxes(!showCheckboxes);
          }}
        >
          {showCheckboxes ? 'close' : 'open'}
        </button>

        {showCheckboxes && (
          <Portal>
            <FilterPortalDropdown style={{ ...coords }}>
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
            </FilterPortalDropdown>
          </Portal>
        )}
      </div>
    </FilterDropdownContainer>
  );
};

export default FilterDropdown;
