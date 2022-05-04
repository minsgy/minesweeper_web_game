import { CELL_MARGIN, CELL_SIZE } from '~lib/constants';
import styled from 'styled-components';

const Wrapper = styled.div<{ boardSize: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px auto 0 auto;
  width: ${({ boardSize }) => boardSize * (CELL_SIZE + CELL_MARGIN * 2)}px;
`;

export { Wrapper };
