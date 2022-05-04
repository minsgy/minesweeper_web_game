import styled from 'styled-components';

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: black;
  height: 36px;
`;

const StyledText = styled.span`
  font-size: 16px;
  &:last-child {
    margin-left: 8px;
  }
`;

const NoticeText = styled.li`
  font-size: 20px;
  font-weight: bold;
`;

export { ListWrapper, ListItem, StyledText, NoticeText };
