import styled from 'styled-components';
import { forkBallBg, fastBallBg, speedColor, contactColor } from './colors';

export const StyledPlayerSkill = styled.div`
  display: flex;
  width: 200px;
  text-transform: uppercase;

  span {
    flex: 1;
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

export const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const Box = styled.div((props) => {
  const justify = props.justify ? `justify-content: ${props.justify}` : '';
  const align = props.alignItems ? `align-items: ${props.alignItems}` : '';
  const direction = props.direction ?? 'row';
  return `
    display: flex;
    margin: ${props.margin ?? 0};
    padding: ${props.padding ?? 0};
    gap: ${props.gap || 0};
    flex-direction: ${direction};
    ${justify};
    ${align};
  `;
});
