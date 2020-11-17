import React from 'react';
import { keys } from 'lodash';
import FilterAllNoneControls from './FilterAllNoneControls';

const TeamFilterList = ({ filters, setFilters, filterAttr }) => {
  return (
    <div className={`team-filter-items`}>
      <FilterAllNoneControls setFilters={setFilters} filterAttr={filterAttr} />
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
              <img
                alt={`${value} logo`}
                src={`${process.env.PUBLIC_URL}/team_logos/${value}.png`}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamFilterList;
