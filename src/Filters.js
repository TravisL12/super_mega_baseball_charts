import React from 'react';
import FilterList from './FilterList';
import TeamFilterList from './TeamFilterList';
import { FilterListContainer, FilterColumn } from './styles';
import { positionsAbbrev } from './utilities/helper';

const Filters = ({ filters, setFilters, selectedPlayers }) => {
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
          small={true}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="pitchers"
          filters={filters}
          small={true}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="bats"
          filters={filters}
          small={true}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="throws"
          filters={filters}
          small={true}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="gender"
          filters={filters}
          small={true}
          setFilters={setFilters}
        />
      </FilterColumn>
      <FilterColumn>
        <div className="selected-players">
          <p>Compare Players</p>
          <ul>
            {selectedPlayers.map(
              ({ name, position, pitcherRole, isPitcher }) => (
                <li key={name}>
                  {isPitcher
                    ? positionsAbbrev[pitcherRole]
                    : positionsAbbrev[position]}{' '}
                  - {name}
                </li>
              )
            )}
          </ul>
        </div>
      </FilterColumn>
    </FilterListContainer>
  );
};

export default Filters;
