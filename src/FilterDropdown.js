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
  FilterPortalDropdownTitle,
} from './styles/FilterList.style';
import Portal from './FilterPortal';
import { usePortal } from './hooks/usePortal';

const FilterDropdown = ({ filters, setFilters, filterAttr }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal({ top: 20 });

  return (
    <FilterDropdownContainer>
      <FilterItems>
        <ToggleItemLink
          style={{ fontSize: '16px' }}
          onClick={(e) => {
            setPortalCoordinates(e);
            setShowCheckboxes(!showCheckboxes);
          }}
        >
          {startCase(filterAttr)}
        </ToggleItemLink>
      </FilterItems>

      {showCheckboxes && (
        <Portal>
          <FilterPortalDropdown style={{ ...coords }}>
            <FilterPortalDropdownTitle>
              <FilterAllNoneControls
                setFilters={setFilters}
                filterAttr={filterAttr}
              />
              <ToggleItemLink
                onClick={() => {
                  setShowCheckboxes(false);
                }}
              >
                Close
              </ToggleItemLink>
            </FilterPortalDropdownTitle>
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
