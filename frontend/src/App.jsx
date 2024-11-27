import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './assets/pages/Home/Home.jsx';
import Historico from './assets/pages/Historico/Historico.jsx';
import Login from './assets/pages/Login/Login.jsx';
import Config from './assets/pages/Config/Config.jsx';
import ViewProfile from './assets/pages/Config/pages/Profile/ViewProfile.jsx';
import RegistrarEntrega from './assets/pages/Home/RegistrarEntrega.jsx';
import AutenticacaoRouter from "./assets/routes/AutenticacaoRouter.jsx"
import VerifyAuth from './assets/components/VerifyAuth/VerifyAuth.jsx';
import VerifyAuthLogin from './assets/components/VerifyAuth/VerifyAuthLogin.jsx';
import Navbar from './assets/components/Navbar/Navbar.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <VerifyAuthLogin>
              <AutenticacaoRouter/>
            </VerifyAuthLogin>
          }
        />
        <Route
          path="/"
          element={
            <VerifyAuthLogin>
              <Login />
            </VerifyAuthLogin>
          }
        />

        <Route
          path="/home"
          element={
            <VerifyAuth>
              <Home />
              <Navbar/>
            </VerifyAuth>
          }
        />
        <Route
          path="/historico"
          element={
            <VerifyAuth>
              <Historico />
              <Navbar/>
            </VerifyAuth>
          }
        />
        <Route
          path="/config"
          element={
            <VerifyAuth>
              <Config />
              <Navbar/>
            </VerifyAuth>
          }
        />
        <Route
          path="/config/profile"
          element={
            <VerifyAuth>
              <ViewProfile />
              <Navbar/>
            </VerifyAuth>
          }
        />
        <Route
          path="/entrega/enviar"
          element={
            <VerifyAuth>
              <RegistrarEntrega />
              <Navbar/>
            </VerifyAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
