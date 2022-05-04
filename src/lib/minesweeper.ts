/* eslint-disable @typescript-eslint/no-explicit-any */
import { CELL_FLAG } from './constants';
import { createArray } from './creater';

// @NOTE : 게임 보드 생성 함수
export const initialBoard = (width: number, height: number, mineCount: number) => {
  const candidates: number[] = createArray(width * height, null).map((_, i) => i); // 중복 방지를 위해 index 배열을 추가해 splice로 중복 값을 제거하기 위한 임의 배열
  const shuffle: number[] = []; // 지뢰 위치를 저장하는 1차원 숫자 배열
  const resultBoard: number[][] = []; // 연산 완료 된 2차원 게임 보드

  // @NOTE : candidates 길이 > 지뢰를 제외한 빈 셀 = 지뢰 개수만큼 추출
  // 지뢰 위치의 중복을 막기위해 이와 같은 로직을 적용
  while (candidates.length > width * height - mineCount) {
    const randomArrayIndex = Math.floor(candidates.length * Math.random()); // 중복 제거 된 배열 길이 사이의 숫자를 랜덤으로 추출
    const chosen = candidates.splice(randomArrayIndex, 1)[0]; // 추출한 숫자를 제외한 나머지 숫자들을 추출한다.
    shuffle.push(chosen);
  }

  // @NOTE : 전체 보드 Cell 생성 함수
  for (let i = 0; i < height; i++) {
    const rowArray = createArray(width, CELL_FLAG.NOTHING);
    resultBoard.push(rowArray);
  }

  // @NOTE : 지뢰 위치 설정
  for (const mineCell of shuffle) {
    // 랜덤으로 지정 된 지뢰의 index 값을 이용해 x, y 좌표를 구한다.
    const x = mineCell % width;
    const y = Math.floor(mineCell / width);
    resultBoard[y][x] = CELL_FLAG.MINE;
  }

  return resultBoard;
};

// @NOTE : 오른쪽 버튼 클릭 시, Flag 설정 함수
export const getNextCellCode = (cell: number) => {
  // 열지 않은 쉘 => Flag => 열지 않은 쉘 ... 방식으로 설정
  switch (cell) {
    case CELL_FLAG.NOTHING:
      return CELL_FLAG.FLAG;
    case CELL_FLAG.MINE:
      return CELL_FLAG.MINE_FLAG;
    case CELL_FLAG.FLAG:
      return CELL_FLAG.NOTHING;
    case CELL_FLAG.MINE_FLAG:
      return CELL_FLAG.MINE;
    default:
      return cell;
  }
};

// @NOTE: Flag 취소/적용 여부를 파악하고 설정하는 함수
export const getFlagCount = (cell: number) => {
  switch (cell) {
    case CELL_FLAG.NOTHING:
    case CELL_FLAG.MINE:
      return 1;
    case CELL_FLAG.FLAG:
    case CELL_FLAG.MINE_FLAG:
      return -1;
    default:
      return 0;
  }
};

// @NOTE :
export const openCell = (board: number[][], row: number, col: number) => {
  let openCellCount = 0;

  // @NOTE : 주어진 좌표의 셀이 지뢰인지 확인하여 Cell에 명시 할 Mine 개수를 구하는 함수
  const getMineCount = (row: number, col: number) => {
    let containCells: any[] = [];
    let mineCount = 0;

    // 선택한 셀 상단 3개
    containCells = board[col - 1]
      ? containCells.concat(board[col - 1][row - 1], board[col - 1][row], board[col - 1][row + 1])
      : containCells;

    // 선택한 셀 양 옆 2개
    containCells = containCells.concat(board[col][row - 1], board[col][row + 1]);

    // 선택한 셀 하단 3개
    containCells = board[col + 1]
      ? containCells.concat(board[col + 1][row - 1], board[col + 1][row], board[col + 1][row + 1])
      : containCells;

    // Cell에 표시 될 주변 지뢰+플래그를 가진 지뢰 개수를 구하는 Filter
    mineCount = containCells.filter((v) =>
      [CELL_FLAG.MINE, CELL_FLAG.MINE_FLAG].includes(v),
    ).length;

    return mineCount;
  };

  // @NOTE: 재귀 DFS 탐색을 활용한 열어야 할 셀을 찾는 함수
  const boardSearchExplorer = (row: number, col: number) => {
    // 해당 셀이 NOTHING이 아니라면, 재귀 탐색을 종료한다. (지뢰, 플래그, 열린 셀)
    if (board[col][row] !== CELL_FLAG.NOTHING) {
      return;
    }

    board[col][row] = getMineCount(row, col);
    openCellCount++;

    let stack: any[] = [];

    // 탐색 중인 셀 상단 3개
    stack = board[col - 1]
      ? stack.concat(
          { row: row - 1, col: col - 1 },
          { row, col: col - 1 },
          { row: row + 1, col: col - 1 },
        )
      : stack;
    // 탐색 중인 셀 양 옆 2개
    stack = stack.concat({ row: row - 1, col }, { row: row + 1, col });
    // 탐색 중인 셀 하단 3개
    stack = board[col + 1]
      ? stack.concat(
          { row: row - 1, col: col + 1 },
          { row, col: col + 1 },
          { row: row + 1, col: col + 1 },
        )
      : stack;

    // @NOTE: 주변 셀이 모두 열려있으면, DFS방식의 탐색
    if (board[col][row] === CELL_FLAG.OPEN) {
      stack.forEach((cell) => {
        boardSearchExplorer(cell.row, cell.col);
      });
    }
  };

  boardSearchExplorer(row, col);

  // 탐색 완료한 보드, 열린 셀의 개수 반환
  return { board, openCellCount };
};
