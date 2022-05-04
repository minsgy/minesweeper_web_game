import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { control } from '~modules/control';
import { RootState } from '~store';
import { Wrapper, MineCount, ButtonWrapper, StyledButton, Timer } from './style';
import { useInterval } from '~hooks';
import { Link } from 'react-router-dom';

const Status = () => {
  const dispatch = useDispatch();
  const { startGame, updateTimer } = control.actions;

  const timer = useSelector((state: RootState) => state.control.timer);
  const isRunning = useSelector((state: RootState) => state.control.isRunning);
  const mineCount = useSelector((state: RootState) => state.control.mineCount);
  const flagCount = useSelector((state: RootState) => state.control.flagCount);

  const leftMineCount = mineCount - flagCount;

  // @NOTE: 게임 재시작 이벤트
  const onClickRestartButton = useCallback(() => {
    dispatch(startGame());
  }, []);

  // @NOTE: 타이머 시작 - 게임 진행 중이 아니라면 중단
  useInterval(
    () => {
      dispatch(updateTimer());
    },
    isRunning ? 1000 : null,
  );

  return (
    <Wrapper>
      <MineCount>
        남은 폭탄 개수 : <strong>{leftMineCount}</strong>
      </MineCount>
      <ButtonWrapper>
        <StyledButton id="restart" onClick={onClickRestartButton}>
          다시 시작하기
        </StyledButton>
        <Link to="/rank">
          <StyledButton id="rank-link">랭킹 확인하기</StyledButton>
        </Link>
      </ButtonWrapper>
      <Timer>
        경과 시간 : <strong>{timer}</strong>
      </Timer>
    </Wrapper>
  );
};

export default Status;
