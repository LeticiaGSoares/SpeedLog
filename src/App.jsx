import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from './assets/pages/NotFound/NotFound'
import MessageDisplay from './assets/components/Message/MessageDisplay.jsx';
import { MessageProvider } from './assets/components/Message/MessageContext.jsx';

import {
    Login, AutenticacaoRouter
} from './assets/routes/index.js'
import Home from './assets/pages/Home/Home.jsx';


const App = () => {
  return (
    <MessageProvider>
      <BrowserRouter>
            <MessageDisplay />
            <Routes>
                <Route path="/*" element={<AutenticacaoRouter />} />
                <Route path="/home" element={<Login/>}/>
            </Routes>
      </BrowserRouter>
    </MessageProvider>
  );
};

export default App