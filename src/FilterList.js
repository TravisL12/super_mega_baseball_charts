import React from "react";
import { keys, values, startCase } from "lodash";

const FilterList = ({ filters, setFilters, filterAttr }) => {
  const allSelected = values(filters[filterAttr]).every((value) => value);

  return (
    <div className="filter-items">
      <div
        className="all-items"
        onClick={() =>
          setFilters((prevFilters) => {
            const values = keys(prevFilters[filterAttr]).reduce(
              (acc, value) => {
                acc[value] = !allSelected;
                return acc;
              },
              {}
            );

            return { ...prevFilters, [filterAttr]: values };
          })
        }
      >
        {allSelected ? "Deselect" : "Select"} All {startCase(filterAttr)}
      </div>
      {keys(filters[filterAttr]).map((value) => (
        <div className="filter-checkbox-container" key={value}>
          <input
            type="checkbox"
            id={value}
            checked={filters[filterAttr][value]}
            onChange={() =>
              setFilters((prevFilters) => {
                const values = { ...prevFilters[filterAttr] };
                values[value] = !values[value];
                return { ...prevFilters, [filterAttr]: values };
              })
            }
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterList;
