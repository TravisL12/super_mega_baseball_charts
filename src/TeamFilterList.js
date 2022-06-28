import React from "react";
import { keys } from "lodash";
import FilterAllNoneControls from "./FilterAllNoneControls";
import { StyledTeamFilter, Img } from "./styles";

const TeamFilterList = ({ filters, setFilters, filterAttr }) => {
  return (
    <StyledTeamFilter>
      <div className="team-filter-grid">
        {keys(filters[filterAttr]).map((value) => (
          <div
            className="team-checkbox-container"
            key={`${filterAttr}-${value}`}
          >
            <input
              type="checkbox"
              id={`${filterAttr}-${value}`}
              checked={filters[filterAttr][value]}
              onChange={() =>
                setFilters((prevFilters) => {
                  const values = { ...prevFilters[filterAttr] };
                  values[value] = !values[value];
                  return { ...prevFilters, [filterAttr]: values };
                })
              }
            />
            <label htmlFor={`${filterAttr}-${value}`}>
              <Img
                alt={`${value} logo`}
                src={`${process.env.PUBLIC_URL}/team_logos/${value}.png`}
              />
            </label>
          </div>
        ))}
      </div>
      <FilterAllNoneControls setFilters={setFilters} filterAttr={filterAttr} />
    </StyledTeamFilter>
  );
};

export default TeamFilterList;
