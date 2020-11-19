import React from 'react';
import FilterList from './FilterList';
import TeamFilterList from './TeamFilterList';
import { FilterListContainer, FilterFlex } from './styles';
import { ToggleItemLink } from './styles/FilterList.style';

const Filters = ({
  filters,
  setFilters,
  selectedPlayers,
  clearCompareSelection,
  toggleCompare,
}) => {
  return (
    <FilterListContainer>
      <FilterFlex>
        <TeamFilterList
          filterAttr="teams"
          filters={filters}
          setFilters={setFilters}
        />

        {selectedPlayers.length > 0 && (
          <FilterFlex isRow={true}>
            <ToggleItemLink onClick={toggleCompare}>
              {filters.showCompare ? 'Compare Off' : 'Compare On'}
            </ToggleItemLink>
            <ToggleItemLink onClick={clearCompareSelection}>
              Clear Selections
            </ToggleItemLink>
          </FilterFlex>
        )}
      </FilterFlex>

      <FilterFlex>
        <FilterFlex>
          <FilterList
            filterAttr="traits"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="traits2"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="positions"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="positions2"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="pitchers"
            filters={filters}
            setFilters={setFilters}
          />
        </FilterFlex>
        <FilterFlex isRow={true}>
          <FilterList
            filterAttr="bats"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="gender"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="throws"
            filters={filters}
            setFilters={setFilters}
          />
        </FilterFlex>
      </FilterFlex>
    </FilterListContainer>
  );
};

export default Filters;
