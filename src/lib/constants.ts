export const CELL_SIZE = 42 as const;
export const CELL_MARGIN = 2 as const;

export const BOARD_SIZE = 8 as const;
export const BOARD_MINE_COUNT = 6 as const;

export const STATUS = {
  READY: 'ready',
  RUN: 'run',
  WIN: 'win',
  LOSE: 'lose',
} as const;

export const CELL_FLAG = {
  OPEN: 0,
  NOTHING: -1,
  FLAG: -2,
  MINE: -3,
  MINE_FLAG: -4,
} as const;

export const MINE_SWEEPER_RANK = 'minesweeper-rank' as const;
