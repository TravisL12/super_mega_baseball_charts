import styled from 'styled-components';
import {
  disableGray,
  highlightGray,
  armColor,
  backgroundColor,
} from './colors';

export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / 3;
  grid-row: 2;
  padding: 0 20px;
  background: ${backgroundColor};
  overflow: auto;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
  }

  .filter-items {
    padding: 2px 4px;

    .title {
      font-size: 18px;
      min-width: 100px;
    }

    .all-none-filters {
      display: flex;
      justify-content: space-around;
      margin-bottom: 5px;

      .toggle-all-items {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .filter-checkbox-container + .filter-checkbox-container {
      margin-top: 2px;
    }
  }

  .filter-items.small {
    display: flex;
    justify-content: space-between;

    .small-list {
      display: flex;
    }

    .filter-checkbox-container {
      margin-top: 0;

      label {
        text-align: center;
        min-width: 35px;
      }
    }
  }

  label {
    display: block;
    padding: 4px 10px;
    background: ${disableGray};
    cursor: pointer;
    transition: 0.05s linear background;

    &:hover {
      background: ${highlightGray};
    }
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked + label {
    background: ${armColor};
    box-shadow: inset 0 0 0px 1px white;
  }

  .team-filter-grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(10, 60px);
    grid-template-rows: 60px 60px;

    .team-checkbox-container {
      label {
        padding: 0;
        width: 100%;
        height: 100%;

        img {
          max-width: 100%;
          max-height: 100%;
          filter: grayscale(0.9);
        }
      }

      input[type='checkbox']:checked + label {
        img {
          filter: grayscale(0);
        }
      }
    }
  }
`;