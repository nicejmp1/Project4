import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Test from './components/Test'

import { DataProvider } from './context/DataContext'

// page
import Home from './pages/Home'
import Scholl from './pages/Scholl'
import Academy from './pages/Academy'
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Main menuOpen={menuOpen}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test' element={<Test />} />
            <Route path='/scholl' element={<Scholl />} />
            <Route path='/academy' element={<Academy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Main>
        <Footer menuOpen={menuOpen} />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
