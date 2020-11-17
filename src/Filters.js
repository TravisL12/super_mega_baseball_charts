import React from 'react';
import FilterList from './FilterList';
import TeamFilterList from './TeamFilterList';
import { FilterListContainer, FilterColumn } from './styles';
import { positionsAbbrev } from './utilities/constants';
import { SelectedPlayers, ToggleItemLink } from './styles/FilterList.style';
import { Box } from './styles/App.style';

const Filters = ({
  filters,
  setFilters,
  selectedPlayers,
  clearCompareSelection,
}) => {
  return (
    <FilterListContainer>
      <TeamFilterList
        filterAttr="teams"
        filters={filters}
        setFilters={setFilters}
      />

      <FilterColumn>
        <FilterList
          filterAttr="positions"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="pitchers"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="bats"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="throws"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="gender"
          filters={filters}
          setFilters={setFilters}
        />
      </FilterColumn>
      <FilterColumn>
        <SelectedPlayers>
          <Box>
            <p>Compare Players</p>
            {selectedPlayers.length > 0 && (
              <>
                <ToggleItemLink onClick={clearCompareSelection}>
                  Clear
                </ToggleItemLink>
              </>
            )}
          </Box>
          <ul>
            {selectedPlayers.map(
              ({ name, position, pitcherRole, isPitcher }) => (
                <li key={name}>
                  <span>
                    {isPitcher
                      ? positionsAbbrev[pitcherRole]
                      : positionsAbbrev[position]}
                  </span>{' '}
                  - <span>{name}</span>
                </li>
              )
            )}
          </ul>
        </SelectedPlayers>
      </FilterColumn>
    </FilterListContainer>
  );
};

export default Filters;
