import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
