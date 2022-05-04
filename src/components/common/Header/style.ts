import styled from 'styled-components';

type IContent = {
  align: 'flex-start' | 'center' | 'flex-end';
};

const StyleHeader = styled.header`
  padding: 16px;
  background-color: transparent;
`;

const StyleInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div<IContent>`
  display: flex;
  flex: 1;
  justify-content: ${({ align }) => align};
`;

export { StyleHeader, StyleInner, Content };
