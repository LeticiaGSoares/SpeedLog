import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CadastroCliente from './assets/pages/Cadastro/CadastroCliente/CadastroCliente';
import CadastroMotoboy from './assets/pages/Cadastro/CadastroMotoboy/CadastroMotoboy';
import Login from './assets/pages/Login/Login';
import EscolhaDePerfil from './assets/pages/Cadastro/PerfilChoice/PerfilChoice';
import DetalhesMoto from './assets/pages/Cadastro/CadastroMotoboy/DetalhesMoto';
import UploadFotoPerfil from './assets/pages/Cadastro/CadastroCliente/UploadFotoPerfil';
import { Upload } from '@mui/icons-material';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/escolha-de-perfil" element={<EscolhaDePerfil />} />
        <Route path='/cadastro-cliente' element={<CadastroCliente />} />
        <Route path='/cadastro-motoboy' element={<CadastroMotoboy />} />
        <Route path='/foto-motoboy' element={<fotoMotoboy />} />
        <Route path='/dados-moto' element={<DetalhesMoto />}/>
        <Route path='/foto-cliente' element={<UploadFotoPerfil/>}/>
      </Routes>
    </Router>
  </StrictMode>
);
