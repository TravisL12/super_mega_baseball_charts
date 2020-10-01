import React from 'react';
import FilterList from './FilterList';
import { FilterListContainer } from './styles';

const Filters = ({ filters, setFilters }) => {
  return (
    <FilterListContainer>
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
        filterAttr="teams"
        filters={filters}
        setFilters={setFilters}
      />
    </FilterListContainer>
  );
};

export default Filters;
