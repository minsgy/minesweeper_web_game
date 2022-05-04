import styled from 'styled-components';
import { CELL_SIZE, CELL_FLAG, CELL_MARGIN } from '~lib/constants';
import Button from '~components/common/Button';

const CellButton = styled(Button)<{ cellData: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  margin: ${CELL_MARGIN}px;
  border: 2px solid #666;
  font-family: consolas, monospace;

  /* 타입 별 배경 컬러 변경 */
  background-color: ${({ cellData }) => {
    switch (cellData) {
      case CELL_FLAG.NOTHING:
      case CELL_FLAG.MINE:
        return '#FFF';
      case CELL_FLAG.FLAG:
      case CELL_FLAG.MINE_FLAG:
        return '#95E0C8';
      default:
        return '#F4D74F';
    }
  }};

  /* 숫자 별 글씨 색 변경 */
  color: ${({ cellData }) => {
    switch (cellData) {
      case 1:
        return '#007BD9';
      case 2:
        return '#09B219';
      case 3:
        return '#FB0B0D';
      case 4:
        return '#223DAA';
      default:
        return 'black';
    }
  }};
`;

export { CellButton };
