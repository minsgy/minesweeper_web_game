import styled from 'styled-components';
import { CELL_SIZE, CELL_FLAG, CELL_MARGIN } from '@lib/constants';
import Button from '@components/common/Button';

const CellButton = styled(Button)<{ cellData: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  cursor: pointer;
  margin: ${CELL_MARGIN}px;
  border: 2px solid #666;
  font-family: consolas, monospace;
  color: black;
  background-color: ${({ cellData }) => {
    switch (cellData) {
      case CELL_FLAG.NOTHING:
      case CELL_FLAG.MINE:
        return '#FFF';
      case CELL_FLAG.FLAG:
      case CELL_FLAG.MINE_FLAG:
        return '#F1C40F';
      case CELL_FLAG.QUESTION:
      case CELL_FLAG.MINE_QUESTION:
        return '#44D580';
      default:
        return '#DDD';
    }
  }};

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
      case 5:
        return '#D35400';
      case 6:
        return '#8E44AD';
      case 7:
        return '#904323';
      case 8:
        return '#FC427B';
      default:
        return 'black';
    }
  }};
`;

export { CellButton };
