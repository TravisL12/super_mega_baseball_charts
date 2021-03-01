import React from 'react';
import { PlayerColumn } from '../styles/Table.style';
import SelectionCheckbox from './SelectionCheckbox';
import TableColumn from './TableColumn';

const TableRow = ({ isChecked, player, addPlayerCompareList, headers }) => {
  return (
    <tr key={player.name}>
      <PlayerColumn className="player-checkbox">
        <SelectionCheckbox
          onChange={() => {
            addPlayerCompareList(player.id);
          }}
          isChecked={isChecked}
          id={`compare-${player.name}`}
          value={player.id}
        />
      </PlayerColumn>
      {headers.map(({ header }) => {
        return <TableColumn key={header} player={player} header={header} />;
      })}
    </tr>
  );
};

export default React.memo(TableRow);
