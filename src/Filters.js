import React from "react";
import FilterList from "./FilterList";
import TeamFilterList from "./TeamFilterList";
import { FilterListContainer, Box, SFilterGrid } from "./styles";
import { ToggleItemLink, SFilterControls } from "./styles/FilterList.style";
import FilterDropdown from "./FilterDropdown";

const Filters = ({ filters, setFilters, toggleCompare }) => {
  return (
    <FilterListContainer direction="column">
      <SFilterControls gap="10px">
        <TeamFilterList
          filterAttr="teams"
          filters={filters}
          setFilters={setFilters}
        />
        <SFilterGrid>
          <FilterDropdown
            filterAttr="positions"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterDropdown
            filterAttr="traits"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="bats"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterList
            filterAttr="rating"
            filters={filters}
            setFilters={setFilters}
            showNoneAll={true}
          />
          <FilterDropdown
            filterAttr="positions2"
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
          <FilterList
            filterAttr="pitchers"
            filters={filters}
            setFilters={setFilters}
            showNoneAll={true}
          />
          <div style={{ gridColumn: 3 }}>
            <FilterList
              filterAttr="gender"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <FilterList
            filterAttr="pitches"
            filters={filters}
            setFilters={setFilters}
            showNoneAll={true}
          />
        </SFilterGrid>
      </SFilterControls>

      {filters.comparePlayerIds.length > 0 && (
        <ToggleItemLink onClick={toggleCompare}>
          {filters.showCompare ? "Compare Off" : "Compare On"}
        </ToggleItemLink>
      )}
    </FilterListContainer>
  );
};

export default Filters;
