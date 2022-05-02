export const CELL_SIZE = 42 as const;
export const CELL_MARGIN = 2 as const;

export const STATUS = {
  READY: 'ready',
  RUN: 'run',
  WIN: 'win',
  LOSE: 'lose',
};

export const CELL_FLAG = {
  MINE_QUESTION: -3,
  MINE_FLAG: -2,
  MINE: -1,
  OPEN: 0,
  NOTHING: 1,
  FLAG: 2,
  QUESTION: 3,
} as const;
