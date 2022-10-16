import React from "react";
import FilterList from "./FilterList";
import TeamFilterList from "./TeamFilterList";
import { FilterListContainer, Box } from "./styles";
import { ToggleItemLink, SFilterControls } from "./styles/FilterList.style";
import FilterDropdown from "./FilterDropdown";

const Filters = ({ filters, setFilters, toggleCompare }) => {
  return (
    <FilterListContainer direction="column">
      <SFilterControls gap="10px">
        <Box>
          <TeamFilterList
            filterAttr="teams"
            filters={filters}
            setFilters={setFilters}
          />
        </Box>
        <div className="positions">
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
        </div>
        <div className="traits">
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
        </div>
        <div className="basic-attrs">
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
        </div>
        <div className="pitching-attrs">
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
            filterAttr="pitches"
            filters={filters}
            setFilters={setFilters}
            showNoneAll={true}
          />
        </div>
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
