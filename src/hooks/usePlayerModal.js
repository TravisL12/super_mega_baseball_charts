import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const usePlayerModal = (players) => {
  const [modalPlayer, setModalPlayer] = useState(null);
  const query = useQuery();
  const history = useHistory();

  const setPlayerModal = (player) => {
    history.push({ search: `?player=${player.name}` });
    setModalPlayer(player);
  };

  const closePlayerModal = () => {
    history.push({ search: '' });
    setModalPlayer(null);
  };

  useEffect(() => {
    const playerName = query.get('player');
    const queryPlayer = players.find((player) => player.name === playerName);
    if (queryPlayer) {
      setModalPlayer(queryPlayer);
    }
  }, [players, query]);

  return { setPlayerModal, closePlayerModal, modalPlayer };
};

export default usePlayerModal;
