import styled from 'styled-components';
import { backgroundColor, disableGray } from './colors';

export const AppContainer = styled.div`
  background: ${backgroundColor};
  color: white;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 80px 185px 1fr;
  grid-row-gap: 10px;
  height: 100vh;
  box-sizing: border-box;

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;
    }
  }

  .title-logo {
    display: flex;
    background: black;
    align-items: center;
    grid-column: 1;
    grid-row: 1;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
`;

export const NoPlayer = styled.div`
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
`;
