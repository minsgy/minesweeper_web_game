import RankList from '~components/RankList';
import Header from '~components/common/Header';
import Layout from '~layouts';
import { Link } from 'react-router-dom';

const RankPage = () => {
  const HeaderConfig = {
    leftContent: <Link to="/">메인으로</Link>,
    centerContent: <div>Minsgy MineSweeper</div>,
  };

  return (
    <Layout>
      <Header {...HeaderConfig} />
      <RankList />
    </Layout>
  );
};

export default RankPage;
