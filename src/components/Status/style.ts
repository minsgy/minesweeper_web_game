import Button from '~components/common/Button';
import styled from 'styled-components';
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleText = styled.h1``;

const MineCount = styled.div`
  font-size: 16px;
  strong {
    font-size: 20px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div``;

const StyledButton = styled(Button)`
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  background-color: white;

  &:hover {
    background-color: #f1c40f;
  }

  &#restart {
    background-color: #f1c40f;
  }
`;

const Timer = styled.div`
  text-align: right;
  strong {
    font-size: 20px;
    font-weight: bold;
  }
`;

export { Wrapper, TitleText, MineCount, ButtonWrapper, StyledButton, Timer };
