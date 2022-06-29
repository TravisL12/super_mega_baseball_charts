import styled from "styled-components";
import {
  backgroundColor,
  disableGray,
  attrTipHighlight,
  speedColor,
  armColor,
  contactColor,
  fieldingColor,
  powerColor,
  accuracyColor,
  velocityColor,
  junkColor,
} from "./colors";

export const TeamTableContainer = styled.div`
  .title {
    text-align: center;
  }

  .skill-tables {
    display: flex;
    flex: 1;
    justify-content: space-between;

    & > div {
      display: flex;
      width: 35%;
      justify-content: space-between;
    }

    .skill {
      display: flex;
      flex-direction: column;
    }
  }
`;

const cellPaddingTb = "7px";
const cellPaddingLr = "5px";

const getSkillColor = {
  speed: speedColor,
  arm: armColor,
  contact: contactColor,
  fielding: fieldingColor,
  power: powerColor,
  accuracy: accuracyColor,
  velocity: velocityColor,
  junk: junkColor,
};

export const PlayerColumn = styled.td`
  position: relative;
  height: 40px;
  text-align: left;
  min-width: 80px;
  box-sizing: border-box;
  font-weight: 500;
  padding: ${cellPaddingTb} ${cellPaddingLr};
  white-space: nowrap;
  min-width: ${(props) => (props.centered ? "20px" : "none")};
  text-align: ${(props) => (props.centered ? "center" : "left")};

  .rating-color {
    background: ${(props) => getSkillColor[props.ratingColor] ?? "white"};
  }

  .modal-link {
    color: white;
  }

  &.player-checkbox {
    min-width: 40px;
    width: 40px;

    .rating-value {
      display: flex;
    }
  }
  &.player-team {
    display: flex;
    align-items: center;
    min-width: 100px;
  }
  &.player-team img {
    max-height: 100%;
    margin-right: 10px;
  }

  &.player-name {
    min-width: 160px;
  }
`;

export const PlayerColumnHeader = styled.th`
  text-transform: uppercase;
  cursor: pointer;
  position: sticky;
  height: 40px;
  background: black;
  top: 0;
  padding: ${cellPaddingTb} ${cellPaddingLr};
  z-index: 1;
  white-space: nowrap;

  min-width: ${(props) => (props.centered ? "20px" : "none")};
  text-align: ${(props) => (props.centered ? "center" : "left")};

  &.header-name {
    min-width: 160px;
  }

  &.header-team {
    min-width: 100px;
  }
`;

export const SPlayerTable = styled.table`
  margin-bottom: 30px;
  padding: 10px;
  width: 100%;
  background: black;
  color: white;
  border-collapse: collapse;

  tr:nth-child(even) ${PlayerColumn} {
    background: ${disableGray};
  }

  .rating-value {
    position: relative;
    display: block;
    color: white;
  }

  .rating-color {
    position: absolute;
    left: ${cellPaddingLr};
    top: ${cellPaddingTb};
    height: calc(100% - (2 * ${cellPaddingTb}));
    width: calc(100% - (2 * ${cellPaddingLr}));

    & + .rating-value {
      text-align: center;
    }

    &:after {
      content: "";
      position: absolute;
      right: 0;
      width: 4px;
      height: 100%;
      background: ${attrTipHighlight};
    }
  }
`;

export const DisplayedTableContainer = styled.div`
  position: relative;
  background: ${backgroundColor};
  padding: 0 10px;
  grid-column: 1 / 3;
  grid-row: 3;
  overflow: auto;
`;
