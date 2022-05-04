import Button from '~components/common/Button';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MineCount = styled.div`
  font-size: 16px;
  strong {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  flex: 1;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  background-color: white;
  border: 2px solid black;

  &#restart {
    background-color: #f1c40f;
    margin-right: 8px;
  }
`;

const Timer = styled.div`
  strong {
    font-size: 20px;
    font-weight: bold;
  }

  & + & {
    margin-left: 8px;
  }
`;

export { Wrapper, MineCount, ButtonWrapper, StyledButton, Timer };
