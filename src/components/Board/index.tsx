import { useCallback, useMemo, memo } from 'react';
import { Wrapper } from './style';
import { RootState } from '@store';
import { useSelector, useDispatch } from 'react-redux';
import { control } from '@modules/control';
import { CELL_FLAG, STATUS } from '@lib/constants';
import { createArray } from '@lib/create';
import Cell from '@components/Cell';

const Board = () => {
  const dispatch = useDispatch();
  const { openCell, changeFlagState } = control.actions;

  // @NOTE : useSelector 렌더링 최적화를 위해 따로 선언
  const width = useSelector((state: RootState) => state.control.width);
  const height = useSelector((state: RootState) => state.control.height);
  const board = useSelector((state: RootState) => state.control.board);
  const status = useSelector((state: RootState) => state.control.status);

  // @NOTE: Cell 오른쪽 마우스 클릭 이벤트
  const onRightClickCell = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, row: number, col: number) => {
      e.preventDefault();
      if (status === STATUS.READY || status === STATUS.RUN) {
        dispatch(changeFlagState({ row, col }));
      }
    },
    [status],
  );

  // @NOTE: Cell 왼쪽 마우스 클릭 이벤트
  const onClickCell = useCallback(
    (row, col) => {
      // 게임 상태가 READY이거나 RUN일 때만 실행
      if (status === STATUS.READY || status === STATUS.RUN) {
        // @NOTE: Cell Open 이벤트
        dispatch(openCell({ row, col }));
      }
    },
    [status],
  );

  // @NOTE : Cell에 입력 될 Text를 반환하는 함수
  const getCellText = useCallback(
    (code: string | number) => {
      switch (code) {
        // @NOTE: 열리거나 닫혔을 때,
        case CELL_FLAG.OPEN:
        case CELL_FLAG.NOTHING:
          return '';
        // @NOTE: FLAG 상태일 때,
        case CELL_FLAG.FLAG:
          return '🚩';
        case CELL_FLAG.MINE_FLAG:
          switch (status) {
            case STATUS.WIN:
              return '🎉';
            case STATUS.LOSE:
              return '💣';
            default:
              return '🚩';
          }
        // @NOTE: 플래그 취소 후 Question 상태일 때,
        case CELL_FLAG.QUESTION:
          return '❔';
        case CELL_FLAG.MINE_QUESTION:
          switch (status) {
            case STATUS.WIN:
              return '🎉';
            case STATUS.LOSE:
              return '💣';
            default:
              return '❔';
          }
        // @NOTE: 지뢰 상태일 때,
        case CELL_FLAG.MINE:
          switch (status) {
            case STATUS.WIN:
              return '🎉';
            case STATUS.LOSE:
              return '💣';
            default:
              return '';
          }
        default:
          return code;
      }
    },
    [status],
  );

  const memoArray = useMemo(() => createArray(width * height, null), [width, height]);

  return (
    <Wrapper boardSize={width}>
      {memoArray.map((_, index) => {
        const x = index % width; // @NOTE: 열
        const y = Math.floor(index / width); // @NOTE: 행
        return (
          <Cell
            key={`${x}-${y}`}
            row={x}
            col={y}
            cellData={board[y][x]}
            cellText={getCellText(board[y][x])}
            onClickCell={onClickCell}
            onRightClickCell={onRightClickCell}
          />
        );
      })}
    </Wrapper>
  );
};

export default memo(Board);
