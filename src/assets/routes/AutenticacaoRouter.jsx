import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CadastroCliente from '../pages/Cadastro/CadastroCliente/CadastroCliente';
import CadastroMotoboy from '../pages/Cadastro/CadastroMotoboy/CadastroMotoboy';
import Login from '../pages/Login/Login';
import EscolhaDePerfil from '../pages/Cadastro/PerfilChoice/PerfilChoice';
import DetalhesMoto from '../pages/Cadastro/CadastroMotoboy/DetalhesMoto';
import UploadFotoPerfil from '../pages/Cadastro/CadastroCliente/UploadFotoPerfil';

const AutenticacaoRouter = () => {
  return (
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
  )
}

export default AutenticacaoRouter;