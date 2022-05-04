import React from 'react';
import { Wrapper } from './style';
interface ILayoutProperties {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProperties) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
