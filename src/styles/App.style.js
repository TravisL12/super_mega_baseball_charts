import styled from 'styled-components';
import { backgroundColor } from './colors';

export const AppContainer = styled.div`
  background: ${backgroundColor};
  color: white;
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 80px auto 1fr;
  grid-row-gap: 10px;
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