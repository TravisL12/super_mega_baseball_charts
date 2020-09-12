import React from "react";
import { keys, values } from "lodash";

const FilterPositions = ({ filters, setFilters }) => {
  const allSelected = values(filters.positions).every((team) => team);
  return (
    <div>
      <span
        className="all-players"
        onClick={() =>
          setFilters((oldFilters) => {
            const positions = keys(oldFilters.positions).reduce((acc, team) => {
              acc[team] = !allSelected;
              return acc;
            }, {});

            return { ...oldFilters, positions };
          })
        }
      >
        {allSelected ? "Deselect" : "Select"} All Positions
      </span>
      {keys(filters.positions).map((teamName) => (
        <div key={teamName}>
          <input
            type="checkbox"
            id={teamName}
            checked={filters.positions[teamName]}
            onChange={() =>
              setFilters((oldFilters) => {
                const positions = { ...oldFilters.positions };
                positions[teamName] = !positions[teamName];
                return { ...oldFilters, positions };
              })
            }
          />
          <label htmlFor={teamName}>{teamName}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterPositions;
