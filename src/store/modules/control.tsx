import { initialBoard, openCell, getNextCellCode, getFlagCount } from '~lib/minesweeper';
import { CELL_FLAG, STATUS, BOARD_SIZE, BOARD_MINE_COUNT } from '~lib/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface ControlState {
  board: number[][];
  width: number;
  height: number;
  status: string;
  flagCount: number;
  mineCount: number;
  openCellCount: number;
  isRunning: boolean;
  timer: number;
}

const initialState: ControlState = {
  board: initialBoard(BOARD_SIZE, BOARD_SIZE, BOARD_MINE_COUNT) as number[][],
  width: BOARD_SIZE,
  height: BOARD_SIZE,
  status: STATUS.READY,
  flagCount: 0,
  mineCount: BOARD_MINE_COUNT,
  openCellCount: 0,
  isRunning: false,
  timer: 0,
};

export const control = createSlice({
  name: 'control',
  initialState,
  reducers: {
    startGame: (state): void => {
      state.board = initialBoard(state.width, state.height, state.mineCount);
      state.width = BOARD_SIZE;
      state.height = BOARD_SIZE;
      state.status = STATUS.READY;
      state.flagCount = 0;
      state.mineCount = BOARD_MINE_COUNT;
      state.openCellCount = 0;
      state.isRunning = false;
      state.timer = 0;
    },
    updateTimer: (state): void => {
      // @NOTE: 업데이트 타이머 호출 시, 타이머 시간을 1초 증가시킨다.
      state.timer += 1;
    },
    openCell: (state, action): void => {
      const { row, col } = action.payload;
      const cell = state.board[col][row];
      state.status = STATUS.RUN;

      // @NOTE: Timer가 시작되지 않았을 때, 시작시킴.
      if (!state.isRunning) {
        state.isRunning = true;
      }

      // @NOTE: 선택 한 셸 상태 검증 로직
      switch (cell) {
        // @NOTE: 선택한 쉘이 지뢰 일 경우,
        case CELL_FLAG.MINE: {
          state.status = STATUS.LOSE; // 게임 오버 설정
          state.isRunning = false; // 타이머 중지
          break;
        }
        // @NOTE: 선택한 쉘이 지뢰가 아닌 경우,
        case CELL_FLAG.NOTHING: {
          const openedResultBoard = openCell(state.board, row, col);
          state.board = openedResultBoard.board;
          state.openCellCount += openedResultBoard.openCellCount;

          // @NOTE: (총 보드 사이즈 - 총 지뢰 수 = 열린 셀 수) -> 게임 승리 조건
          const isWin = state.width * state.height - state.mineCount === state.openCellCount;

          // @NOTE: 만약 이겼을 시 상태를 WIN으로 변경하고, 시간을 종료한다.
          if (isWin) {
            state.status = STATUS.WIN;
            state.isRunning = false;
          }
          break;
        }
        default:
          break;
      }
    },
    changeFlagState: (state, action): void => {
      const { row, col } = action.payload;
      const cell = state.board[col][row];

      if (cell !== CELL_FLAG.OPEN) {
        state.board[col][row] = getNextCellCode(cell);
        state.flagCount += getFlagCount(cell);
      }
    },
  },
});
