import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { control } from '~modules/control';
import { RootState } from '~store';
import { Wrapper, MineCount, ButtonWrapper, StyledButton, Timer } from './style';
import { useInterval, useLocalStorage } from '~hooks';
import { Link } from 'react-router-dom';
import { MINE_SWEEPER_RANK } from '~lib/constants';
import { IRank } from '~types/rank';

const Status = () => {
  const dispatch = useDispatch();
  const [rankList] = useLocalStorage(MINE_SWEEPER_RANK, []);
  const { startGame, updateTimer } = control.actions;

  const timer = useSelector((state: RootState) => state.control.timer);
  const isRunning = useSelector((state: RootState) => state.control.isRunning);
  const mineCount = useSelector((state: RootState) => state.control.mineCount);
  const flagCount = useSelector((state: RootState) => state.control.flagCount);

  const leftMineCount = mineCount - flagCount; // 남은 지뢰 수

  const bestRecordTimer = rankList.reduce((prev: IRank, curr: IRank) => {
    return prev?.score < curr?.score ? prev.score : curr.score;
  }, false); // 최고 기록 가져오기 없다면 False 반환

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
      <Timer id="elapsed-record">
        경과 시간 : <strong>{timer}</strong>
      </Timer>
      {bestRecordTimer ? (
        <Timer id="best-record">
          최고 기록 : <strong>{bestRecordTimer}</strong>
        </Timer>
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Status;
