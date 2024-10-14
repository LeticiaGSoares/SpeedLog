import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './assets/pages/Login/Login';
import EscolhaDePerfil from './assets/pages/PerfilChoice/PerfilChoice';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/escolha-de-perfil" element={<EscolhaDePerfil />} />
      </Routes>
    </Router>
  </StrictMode>
);

