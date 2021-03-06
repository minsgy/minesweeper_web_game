import Board from '~components/Board';
import Status from '~components/Status';
import Header from '~components/common/Header';
import Layout from '~layouts';
const MainPage = () => {
  const HeaderConfig = {
    centerContent: <div>Minsgy MineSweeper</div>,
  };
  return (
    <Layout>
      <Header {...HeaderConfig} />
      <Status />
      <Board />
    </Layout>
  );
};

export default MainPage;
