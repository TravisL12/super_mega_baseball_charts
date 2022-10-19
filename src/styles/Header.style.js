import styled from "styled-components";
import { black, backgroundColor } from "./colors";

export const HeaderContainer = styled.div`
  display: flex;
  background: black;
  align-items: center;
  grid-column: 2 / 3;
  grid-row: 1;
  padding: 0 20px;
  justify-content: space-between;

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
