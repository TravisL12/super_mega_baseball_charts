import styled from 'styled-components';
import { forkBallBg, fastBallBg, speedColor, contactColor } from './colors';

export * from './App.style';
export * from './PlayerCard.style';
export * from './Header.style';
export * from './FilterList.style';
export * from './PlayerCard.style';
export * from './Table.style';
export * from './TeamTable.style';

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
