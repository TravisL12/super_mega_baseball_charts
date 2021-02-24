import React, { useMemo, useState } from 'react';
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

const FILTER_PERCENT_DISPLAY = 0.6;

const FilterDropdown = ({ filters, setFilters, filterAttr }) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [coords, setPortalCoordinates] = usePortal({ top: 35 });

  const selectedFilterCount = useMemo(() => {
    const filter = filters[filterAttr];
    const count = keys(filter).filter((key) => filter[key]).length;
    const total = keys(filter).length;
    if (count === 0 || count / total > FILTER_PERCENT_DISPLAY) {
      return `${count} of ${total}`;
    } else {
      const allSelected = keys(filter).filter((key) => filter[key]);
      return ['positions', 'positions2'].includes(filterAttr)
        ? allSelected.map((key) => positionsAbbrev[key]).join(', ')
        : allSelected.join(', ');
    }
  }, [filters, filterAttr]);
  return (
    <FilterDropdownContainer>
      <FilterItems style={{ flexDirection: 'column' }}>
        <div>
          <ToggleItemLink
            style={{ fontSize: '16px', display: 'inline-block' }}
            onClick={(e) => {
              setPortalCoordinates(e);
              setShowCheckboxes(!showCheckboxes);
            }}
          >
            {startCase(filterAttr)}
          </ToggleItemLink>
        </div>
        <span style={{ fontSize: '12px' }}>{selectedFilterCount}</span>
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
