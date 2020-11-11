import React from 'react';
import FilterList from './FilterList';
import TeamFilterList from './TeamFilterList';
import { FilterListContainer, FilterColumn } from './styles';

const Filters = ({ filters, setFilters }) => {
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
    </FilterListContainer>
  );
};

export default Filters;
