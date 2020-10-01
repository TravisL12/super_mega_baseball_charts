import React from 'react';
import FilterList from './FilterList';
import { FilterListContainer } from './styles';

const Filters = ({ filterNames, filters, setFilters }) => (
  <FilterListContainer>
    {filterNames.map((filter) => {
      return (
        <FilterList
          key={filter}
          filterAttr={filter}
          filters={filters}
          setFilters={setFilters}
        />
      );
    })}
  </FilterListContainer>
);

export default Filters;
