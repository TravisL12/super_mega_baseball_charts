import styled from "styled-components";
import { powerColor } from "./colors";
import { devices } from "./Responsive.style";

export const PlayerCardContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  height: 100%;

  @media ${devices.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1e5290ab; // speedColor @ 0.67 opacity
    width: 100vw;
    height: 100vh;
  }
`;

export const InnerCard = styled.div`
  position: relative;
  background: black;
  padding: 10px;
  border-radius: 6px;
  height: 100%;

  .close-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: ${powerColor};
    border-radius: 0;
    color: white;
    font-size: 18px;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  @media ${devices.tablet} {
    height: auto;
  }
`;
