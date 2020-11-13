import styled from 'styled-components';
import { backgroundColor } from './colors';

export const AppContainer = styled.div`
  background: ${backgroundColor};
  color: white;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 80px 180px 1fr;
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

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
