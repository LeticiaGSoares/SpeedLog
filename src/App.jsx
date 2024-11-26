import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from './assets/pages/NotFound/NotFound'
import Protected from './assets/pages/Protected/Protected';
import Dashboard from './assets/pages/Dashboard/Dashboard';
import MessageDisplay from './assets/components/Message/MessageDisplay.jsx';
import { MessageProvider } from './assets/components/Message/MessageContext.jsx';

import RegistrarEntrega from './assets/pages/Home/RegistrarEntrega'
import { AutenticacaoRouter, Login } from "./assets/routes/index.js";
import Navbar from "./assets/components/Navbar/Navbar";
import Historico from "./assets/pages/Historico/Historico";
import Config from "./assets/pages/Config/Config.jsx";
import ViewProfile from "./assets/pages/Config/pages/Profile/ViewProfile.jsx";
import Home from "./assets/pages/Home/Home.jsx";

const App = () => {
  return (
    <MessageProvider>
      <BrowserRouter>
        <MessageDisplay />
        <Routes>
          <Route path="/*" element={<AutenticacaoRouter />} />
          <Route
            path="/u"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/historico"
            element={
              <>
                <Historico />
                <Navbar />
              </>
            }
          />
          <Route
            path="/config"
            element={
              <>
                <Config />
                <Navbar />
              </>
            }
          />
          <Route
            path="/config/profile"
            element={
              <>
                <ViewProfile />
                <Navbar />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Home />
                <Navbar />
              </>
            }
          />
          <Route
            path="/entrega/enviar"
            element={
              <>
                <RegistrarEntrega />
                <Navbar />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
};

export default App;
