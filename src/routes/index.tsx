import MainPage from '../pages/MainPage';
import { BrowserRouter, Routes as ReactRoutes, Route, Navigate } from 'react-router-dom';

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
