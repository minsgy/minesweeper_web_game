import { StyleHeader, StyleInner, Content } from './style';
import { memo } from 'react';
/**
 * @description 상단 Fixed 헤더 컴포넌트입니다.
 * 확장성을 위해서 Left, Right, Center 컴포넌트를 Props로 사용할 수 있습니다.
 */

interface BaseHeaderProps {
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
  centerContent?: React.ReactElement;
}

const Header = ({ leftContent, rightContent, centerContent }: BaseHeaderProps) => {
  return (
    <>
      <StyleHeader>
        <StyleInner>
          <Content align={'flex-start'}>{leftContent}</Content>
          <Content align={'center'}>{centerContent}</Content>
          <Content align={'flex-end'}>{rightContent}</Content>
        </StyleInner>
      </StyleHeader>
    </>
  );
};

export default memo(Header);
