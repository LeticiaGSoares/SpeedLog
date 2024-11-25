import * as React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./assets/pages/NotFound/NotFound";
import Protected from "./assets/pages/Protected/Protected";
import Dashboard from "./assets/pages/Dashboard/Dashboard";
import MessageDisplay from "./assets/components/Message/MessageDisplay.jsx";
import { MessageProvider } from "./assets/components/Message/MessageContext.jsx";

import RegistrarEntrega from './assets/pages/Home/RegistrarEntrega'
import { Login } from "./assets/routes/index.js";
import Navbar from "./assets/components/Navbar/Navbar";
import Home from "./assets/pages/Home/Home";

const App = () => {
  return (
    <MessageProvider>
      <BrowserRouter>
        <MessageDisplay />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/u"
            element={
              <Protected>
                <Dashboard />
              </Protected>
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
                <RegistrarEntrega/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
};

export default App;
