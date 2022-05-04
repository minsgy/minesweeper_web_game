import MainPage from '~pages/MainPage';
import RankPage from '~pages/RankPage';
import { BrowserRouter, Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
