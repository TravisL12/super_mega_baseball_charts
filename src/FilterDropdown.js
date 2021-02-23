import React, { useState } from 'react';
import { keys, startCase } from 'lodash';
import { positionsAbbrev } from './utilities/constants';
import FilterAllNoneControls from './FilterAllNoneControls';
import {
  FilterDropdownContainer,
  FilterPortalDropdown,
  FilterDropdownCheckbox,
  FilterItems,
  ToggleItemLink,
} from './styles/FilterList.style';
import Portal from './FilterPortal';
import { usePortal } from './hooks/usePortal';

const FilterDropdown = ({ filters, setFilters, filterAttr }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal({ top: 20, left: -90 });

  return (
    <FilterDropdownContainer>
      <FilterItems>
        <div className="filter-items--title dropdown">
          <ToggleItemLink
            className="title"
            onClick={(e) => {
              setPortalCoordinates(e);
              setShowCheckboxes(!showCheckboxes);
            }}
          >
            {showCheckboxes
              ? `Close ${startCase(filterAttr)}`
              : startCase(filterAttr)}
          </ToggleItemLink>
        </div>
      </FilterItems>

      {showCheckboxes && (
        <Portal>
          <FilterPortalDropdown style={{ ...coords }}>
            <FilterAllNoneControls
              setFilters={setFilters}
              filterAttr={filterAttr}
              styles={{
                boxShadow: 'inset 0 0 0px 1px white',
                justifyContent: 'space-around',
                padding: '5px 0',
              }}
            />
            {keys(filters[filterAttr]).map((value) => (
              <FilterDropdownCheckbox key={`${filterAttr}-${value}`}>
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
              </FilterDropdownCheckbox>
            ))}
          </FilterPortalDropdown>
        </Portal>
      )}
    </FilterDropdownContainer>
  );
};

export default FilterDropdown;
