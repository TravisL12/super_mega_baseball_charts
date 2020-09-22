import styled from 'styled-components';

export const AppContainer = styled.div`
  background: #1e2a2f;
  color: white;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 80px 1fr;
  height: 100vh;
  box-sizing: border-box;

  .title-logo {
    display: flex;
    background: black;
    align-items: center;
    grid-column: 1;
    grid-row: 1;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  background: black;
  align-items: center;
  grid-column: 2 / 3;
  grid-row: 1;
  padding: 0 20px;
  justify-content: space-between;

  input[type='text'] {
    width: 400px;
    height: 40px;
    font-size: 18px;
    padding: 8px 10px;
  }

  .player-type-form {
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    height: 50px;
    min-width: 500px;

    input[type='radio'] {
      display: none;
    }

    input[type='radio'] + label {
      display: flex;
      align-items: center;
      min-width: 150px;
      height: 100%;
      justify-content: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(30, 42, 47, 1) 70%,
        rgba(30, 42, 47, 1) 100%
      );
      cursor: pointer;
      padding: 4px 10px;
    }

    input[type='radio']:checked + label {
      background: #1e2a2f;
    }
  }
`;

export const FilterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / 2;
  grid-row: 2;
  padding: 0 20px;
  margin-top: 20px;
  background: #1e2a2f;
  overflow: auto;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
  }

  input[type='checkbox'] {
    display: none;
  }

  label {
    display: block;
    padding: 4px 10px;
    background: #272727;
    cursor: pointer;
    transition: 0.05s linear background;

    &:hover {
      background: #505050;
    }
  }

  input[type='checkbox']:checked + label {
    background: #163356;
    box-shadow: inset 0 0 0px 1px white;
  }

  .filter-checkbox-container + .filter-checkbox-container {
    margin-top: 2px;
  }

  .filter-items {
    background: black;
    padding: 2px 4px;

    .title {
      font-size: 18px;
      text-align: center;
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
  }
`;

const cellPaddingTb = '7px';
const cellPaddingLr = '5px';
export const DisplayedTableContainer = styled.div`
  background: #1e2a2f;
  padding-right: 20px;
  margin-top: 20px;
  grid-column: 2 / 3;
  grid-row: 2;
  overflow: auto;

  table {
    margin-bottom: 30px;
    padding: 10px;
    width: 100%;
    background: black;
    color: white;
    border-collapse: collapse;
  }

  .no-players {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #272727;
    box-shadow: inset 0 0 0px 2px black;
    width: 100%;
    height: 200px;

    p {
      margin: 0 0 10px;
    }
  }

  .header-col {
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    position: sticky;
    background: black;
    top: 0;
    padding: ${cellPaddingTb} ${cellPaddingLr};
    z-index: 1;
  }

  .header-name {
    text-align: left;
    min-width: 160px;
  }

  tr:nth-child(even) .player-col {
    background: #272727;
  }

  .header-col:first-child,
  .player-col:first-child {
    padding-left: 15px;
  }

  .header-team {
    display: flex;
    align-items: center;
    min-width: 100px;
    text-align: left;
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
    background: #5a7b89;

    & + .rating-value {
      text-align: center;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 4px;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .player-col {
    position: relative;
    height: 40px;
    text-align: left;
    min-width: 80px;
    box-sizing: border-box;
    font-weight: 500;
    padding: ${cellPaddingTb} ${cellPaddingLr};

    .pitch-type {
      display: inline-block;
      font-weight: bold;
      font-size: 12px;
      border: 1px solid;
      border-color: orange;
      padding: 0px 2px;
      border-radius: 5px;

      &.pitch-4F,
      &.pitch-2F,
      &.pitch-CF {
        background: #2b094f;
      }
      &.pitch-SB,
      &.pitch-CW,
      &.pitch-FK {
        background: #1e4b4b;
        border-color: #1e4b4b;
      }

      &.pitch-CB,
      &.pitch-SL {
        background: #092f8a;
        border-color: #092f8a;
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

    .header-age,
    .header-position,
    &.player-age,
    &.player-arsenal,
    &.player-pitcherRole,
    &.player-position,
    &.player-trait,
    &.player-trait2,
    &.player-bats,
    &.player-throws,
    &.player-position2,
    &.player-gender,
    &.player-age {
      min-width: 20px;
      text-align: center;
    }

    &.player-speed .rating-color {
      background: #1e5290;
    }
    &.player-arm .rating-color {
      background: #1e3059;
    }
    &.player-contact .rating-color {
      background: #20536e;
    }
    &.player-fielding .rating-color {
      background: #1a2464;
    }
    &.player-power .rating-color {
      background: #5a7b89;
    }
    &.player-accuracy .rating-color {
      background: #773857;
    }
    &.player-velocity .rating-color {
      background: #713e86;
    }
    &.player-junk .rating-color {
      background: #803f7d;
    }
  }
`;

export const TeamTableContainer = styled.div`
  font-size: 12px;

  .team {
    display: flex;
  }
`;
