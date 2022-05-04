import { ListWrapper, ListItem, StyledText } from './style';
import { IRank } from '~types/rank';
import { MINE_SWEEPER_RANK } from '~lib/constants';
import { useLocalStorage } from '~hooks';
import { useMemo } from 'react';

const RankList = () => {
  const [rankList] = useLocalStorage(MINE_SWEEPER_RANK, []);

  // @NOTE : 시간 점수를 오름차순 정렬
  const sortedList = useMemo(
    () => rankList.sort((a: IRank, b: IRank) => a.score - b.score),
    [rankList],
  );

  return (
    <ListWrapper>
      {sortedList?.map((item: IRank, index: number) => (
        <ListItem key={`${item.score}-${index}`}>
          <StyledText>{index + 1}위</StyledText>
          <StyledText>{item.score}초</StyledText>
        </ListItem>
      ))}
    </ListWrapper>
  );
};

export default RankList;
