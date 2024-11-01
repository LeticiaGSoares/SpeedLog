import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ErrorPage from './assets/pages/ErrorPage/ErrorPage';
import Navbar from './assets/components/Navbar/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <ErrorPage />
              <Navbar/>
            </>
          } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
