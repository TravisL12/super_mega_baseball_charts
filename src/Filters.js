import React from 'react';
import FilterList from './FilterList';
import TeamFilterList from './TeamFilterList';
import { FilterListContainer, Box } from './styles';
import { ToggleItemLink } from './styles/FilterList.style';
import FilterDropdown from './FilterDropdown';

const Filters = ({
  filters,
  setFilters,
  selectedPlayers,
  clearCompareSelection,
  toggleCompare,
}) => {
  return (
    <FilterListContainer>
      <Box direction="column">
        <FilterDropdown
          filterAttr="teams"
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Box direction="column">
        <FilterDropdown
          filterAttr="positions"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          filterAttr="positions2"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="bats"
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Box direction="column">
        <FilterDropdown
          filterAttr="traits"
          filters={filters}
          setFilters={setFilters}
        />

        <FilterDropdown
          filterAttr="traits2"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="throws"
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Box direction="column">
        <FilterList
          filterAttr="rating"
          filters={filters}
          setFilters={setFilters}
          showNoneAll={true}
        />
        <FilterList
          filterAttr="pitchers"
          filters={filters}
          setFilters={setFilters}
          showNoneAll={true}
        />
        <FilterList
          filterAttr="gender"
          filters={filters}
          setFilters={setFilters}
        />
      </Box>

      {selectedPlayers.length > 0 && (
        <Box gap="10px">
          <ToggleItemLink onClick={toggleCompare}>
            {filters.showCompare ? 'Compare Off' : 'Compare On'}
          </ToggleItemLink>
          <ToggleItemLink onClick={clearCompareSelection}>
            Clear Selections
          </ToggleItemLink>
        </Box>
      )}
    </FilterListContainer>
  );
};

export default Filters;
