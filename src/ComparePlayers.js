import React, { useEffect, useState, useCallback } from 'react';
import ComparePlayerList from './ComparePlayerList';

import { ComparePlayersContainer } from './styles/ComparePlayers.style';

const ComparePlayers = ({ players }) => {
  return (
    <ComparePlayersContainer>
      <ComparePlayerList players={players} />
      <ComparePlayerList players={players} />
      <ComparePlayerList players={players} />
      <ComparePlayerList players={players} />
    </ComparePlayersContainer>
  );
};

export default ComparePlayers;
