import React from "react";
import { keys, values } from "lodash";

const FilterTeams = ({ teams, filters, setFilters }) => {
  const allSelected = values(filters.teams).every((team) => team);
  return (
    <div>
      <span
        className="all-players"
        onClick={() =>
          setFilters((oldFilters) => {
            const teams = keys(oldFilters.teams).reduce((acc, team) => {
              acc[team] = !allSelected;
              return acc;
            }, {});

            return { ...oldFilters, teams };
          })
        }
      >
        {allSelected && "De-"}Select All Players
      </span>
      {values(teams).map((teamName) => (
        <div key={teamName}>
          <input
            type="checkbox"
            id={teamName}
            checked={filters.teams[teamName]}
            onChange={() =>
              setFilters((oldFilters) => {
                const teams = { ...oldFilters.teams };
                teams[teamName] = !teams[teamName];
                return { ...oldFilters, teams };
              })
            }
          />
          <label htmlFor={teamName}>{teamName}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterTeams;
