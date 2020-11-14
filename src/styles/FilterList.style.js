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
  grid-column: 1 / 3;
  grid-row: 2;
  padding: 0 10px;
  background: ${backgroundColor};
  overflow: auto;
  font-size: 14px;

  .selected-players {
    margin-left: 10px;

    ul {
      display: inline-flex;
      flex-flow: column wrap;
      height: 100%;

      li {
        padding-right: 10px;
      }
    }
  }

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
  }

  .filter-items {
    padding: 2px 4px;
    display: flex;
    align-items: center;

    .filter-list {
      display: flex;
    }

    .filter-checkbox-container {
      label {
        text-align: center;
        min-width: 35px;
      }
    }

    .title {
      font-size: 16px;
      min-width: 80px;
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

  .team-filter-items {
    padding-right: 5px;

    .all-none-filters {
      display: flex;

      .toggle-all-items {
        text-decoration: underline;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
  .team-filter-grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(10, 70px);
    grid-template-rows: 70px 70px;

    .team-checkbox-container {
      label {
        padding: 2px;
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
