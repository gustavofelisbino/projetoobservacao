import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import PesquisaPage from './pages/Pesquisa/PesquisaPage';
import ResumoPage from './pages/Resumos/ResumoPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/pesquisa" element={<PesquisaPage />} />
        <Route path="/resumos" element={<ResumoPage />} />
        <Route path="/resumos/:idUnidade" element={<ResumoPage />} />
      </Routes>
    </Router>
  );
};

export default App;