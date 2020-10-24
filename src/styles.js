import styled from 'styled-components';

const black = '#000000';
const backgroundColor = '#1E2A2F';
const disableGray = '#272727';
const highlightGray = '#505050';
const attrTipHighlight = 'rgba(255, 255, 255, 0.2)';

const forkBallBg = '#1e4b4b';
const fastBallBg = '#2b094f';

const speedColor = '#1e5290';
const armColor = '#1e3059';
const contactColor = '#20536e';
const fieldingColor = '#1a2464';
const powerColor = '#5a7b89';
const accuracyColor = '#773857';
const velocityColor = '#713e86';
const junkColor = '#803f7d';

export const AppContainer = styled.div`
  background: ${backgroundColor};
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

  .player-type-nav {
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    height: 50px;
    min-width: 500px;

    .player-type {
      display: flex;
      align-items: center;
      min-width: 150px;
      color: white;
      text-decoration: none;
      height: 100%;
      justify-content: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background: ${black};
      background: linear-gradient(
        0deg,
        ${black} 0%,
        ${backgroundColor} 70%,
        ${backgroundColor} 100%
      );
      cursor: pointer;
      padding: 4px 10px;

      &.active {
        background: ${backgroundColor};
        font-weight: 800;
      }
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
  background: ${backgroundColor};
  overflow: auto;
  font-size: 14px;

  .all-items {
    cursor: pointer;
    padding: 4px 10px;
    margin-bottom: 2px;
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
        width: 35px;
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

  .filter-checkbox-container + .filter-checkbox-container {
    margin-top: 2px;
  }
`;

export const PlayerCardContainer = styled.div`
  position: fixed;
  text-transform: uppercase;
  top: 100px;
  right: 20px;
  z-index: 2;
  display: flex;
  background: ${black};

  .player-skills {
    width: 250px;
    padding: 0 10px 10px;

    .close-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .bat-throw-pos {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }

    .skills {
      display: flex;
      flex-direction: column;

      .player-skill {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        & > span {
          flex: 1;
        }
      }
    }
  }
`;

export const SkillRating = styled.span`
  position: relative;
  display: inline-block;
  height: 100%;
  width: ${(props) => props.width}%;
  background: ${contactColor};

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 4px;
    height: 100%;
    background: white;
  }
`;

function getPitchType(pitch) {
  switch (pitch) {
    case '4F':
    case '2F':
    case 'CF':
      return fastBallBg;
    case 'SB':
    case 'CW':
    case 'FK':
      return forkBallBg;
    case 'CB':
    case 'SL':
      return speedColor;
    default:
      return 'orange';
  }
}

export const PitchTypeContainer = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 12px;
  border: 1px solid;
  padding: 0px 2px;
  border-radius: 5px;
  background: ${(props) => getPitchType(props.pitchType)};
  border-color: ${(props) =>
    ['4F', '2F', 'CF'].includes(props.pitchType)
      ? 'orange'
      : getPitchType(props.pitchType)};
`;

const cellPaddingTb = '7px';
const cellPaddingLr = '5px';
export const DisplayedTableContainer = styled.div`
  position: relative;
  background: ${backgroundColor};
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
    background: ${disableGray};
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
    background: ${disableGray};
  }

  tr:hover .player-col {
    cursor: pointer;
    background: ${armColor};
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
    background: ${powerColor};

    & + .rating-value {
      text-align: center;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 4px;
      height: 100%;
      background: ${attrTipHighlight};
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

    p {
      margin: 0;
    }

    &.team-col {
      text-align: center;
      overflow: hidden;
      height: 100px;

      &.team-team {
        position: relative;

        .team-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;

          &:hover {
            img {
              opacity: 1;
            }
            p {
              opacity: 0;
            }
          }

          p {
            font-size: 18px;
            z-index: 1;
            transition: 0.2s linear opacity;
          }

          img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 100%;
            opacity: 0.3;
            transition: 0.2s linear opacity;
          }
        }
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
      background: ${speedColor};
    }
    &.player-arm .rating-color {
      background: ${armColor};
    }
    &.player-contact .rating-color {
      background: ${contactColor};
    }
    &.player-fielding .rating-color {
      background: ${fieldingColor};
    }
    &.player-power .rating-color {
      background: ${powerColor};
    }
    &.player-accuracy .rating-color {
      background: ${accuracyColor};
    }
    &.player-velocity .rating-color {
      background: ${velocityColor};
    }
    &.player-junk .rating-color {
      background: ${junkColor};
    }
  }
`;

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
