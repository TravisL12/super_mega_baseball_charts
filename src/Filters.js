import React from 'react';
import FilterList from './FilterList';
import { FilterListContainer, FilterColumn } from './styles';

const Filters = ({ filters, setFilters }) => {
  return (
    <FilterListContainer>
      <FilterColumn>
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
      </FilterColumn>

      <FilterList
        filterAttr="teams"
        filters={filters}
        setFilters={setFilters}
      />
    </FilterListContainer>
  );
};

export default Filters;
