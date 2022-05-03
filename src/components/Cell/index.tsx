import { memo } from 'react';
import { CellButton } from './style';

interface ICellProperties {
  row: number;
  col: number;
  cellData: number;
  cellText: number | string;
  onClickCell: (row: number, col: number) => void;
  onRightClickCell: (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => void;
}

// @NOTE : 왼쪽 마우스 클릭
// 1. 지뢰가 아닌 경우, 인접한 셀 중 지뢰가 있는 만큼 숫자가 표시 된 셀
// 2. 지뢰인 경우, 모든 지뢰가 표시되고 게임 종료된다.

// @NOTE : 오른쪽 마우스 클릭
// 1. Flag 지뢰셸 표시 -> ? 표시 -> NOTHING SHELL

const Cell = ({ row, col, cellData, cellText, onClickCell, onRightClickCell }: ICellProperties) => {
  return (
    <CellButton
      onContextMenu={(e) => onRightClickCell(e, row, col)}
      onClick={() => onClickCell(row, col)}
      cellData={cellData}
    >
      {cellText}
    </CellButton>
  );
};

export default memo(Cell);
