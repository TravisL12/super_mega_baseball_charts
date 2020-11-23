import styled from 'styled-components';
import {
  disableGray,
  highlightGray,
  armColor,
  backgroundColor,
} from './colors';

export const FilterFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isRow ? 'row' : 'column')};
`;

export const FilterDropdownContainer = styled.div`
  position: relative;
  display: flex;

  .dropdown {
    position: relative;
    width: 200px;
  }

  .select {
    select {
      width: 100%;
    }
  }

  .overSelect {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .checkbox-list {
    position: absolute;
    top: 20px;
    z-index: 10;
    width: 200px;
  }
`;

export const FilterListContainer = styled.div`
  display: flex;
  grid-column: 1 / 3;
  grid-row: 2;
  padding: 0 10px;
  background: ${backgroundColor};
  overflow: hidden;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
  }

  .filter-items {
    padding-bottom: 8px;
    display: flex;

    .filter-items--title {
      line-height: 1;
    }

    .filter-items--list {
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
      min-width: 90px;
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

  .all-none-filters {
    display: flex;
    font-size: 12px;
  }

  .team-filter-items {
    padding-right: 5px;
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

export const ToggleItemLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin-right: 10px;
`;

export const SelectedPlayers = styled.div`
  height: 90%;
  margin-left: 10px;

  p {
    margin-right: 10px;
  }

  ul {
    display: inline-flex;
    flex-flow: column wrap;
    height: 100%;

    li {
      padding-right: 10px;

      span:first-child {
        display: inline-block;
        width: 18px;
      }
    }
  }
`;
