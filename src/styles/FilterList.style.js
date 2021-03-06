import styled from 'styled-components';
import { Box } from '.';
import {
  disableGray,
  highlightGray,
  armColor,
  backgroundColor,
} from './colors';

export const FilterPortalDropdown = styled.div`
  position: absolute;
  z-index: 10;
  width: 200px;
  background: white;
`;

export const FilterPortalDropdownTitle = styled.div`
  display: flex;
  box-shadow: inset 0 0 0px 1px white;
  justify-content: space-between;
  background: ${backgroundColor};
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;

export const FilterDropdownCheckbox = styled.div`
  display: flex;
  padding: 4px;
  background: ${armColor};
  box-shadow: inset 0 0 0px 1px white;
  color: white;

  label {
    cursor: pointer;
    flex: 1;
  }
`;

export const FilterDropdownContainer = styled.div`
  position: relative;
  display: flex;

  .dropdown {
    position: relative;
    width: 200px;
  }
`;

export const FilterItems = styled.div`
  display: flex;
  min-width: 150px;
  max-width: 300px;
  padding-bottom: 8px;

  .filter-items--title {
    width: 90px;
  }

  .filter-items--title.dropdown {
    display: flex;
    gap: 10px;
    font-size: 16px;
    width: 150px;
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
`;

export const FilterListContainer = styled(Box)`
  grid-column: 1 / 3;
  grid-row: 2;
  gap: 10px;
  padding: 0 10px;
  background: ${backgroundColor};
  overflow: hidden;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledTeamFilter = styled.div`
  padding-right: 15px;

  .team-filter-grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: 50px 50px;

    .team-checkbox-container {
      label {
        padding: 2px;
        width: 100%;
        height: 100%;

        img {
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
