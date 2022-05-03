export const CELL_SIZE = 42 as const;
export const CELL_MARGIN = 2 as const;

export const BOARD_SIZE = 8 as const;
export const BOARD_MINE_COUNT = 6 as const;

export const STATUS = {
  READY: 'ready',
  RUN: 'run',
  WIN: 'win',
  LOSE: 'lose',
};

export const CELL_FLAG = {
  OPEN: 0,
  NOTHING: -1,
  FLAG: -2,
  QUESTION: -3,
  MINE: -4,
  MINE_FLAG: -5,
  MINE_QUESTION: -6,
} as const;
