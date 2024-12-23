<<<<<<<<< Temporary merge branch 1
import { useState } from "react";
import { NavBar } from "./assets/components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./assets/components/Inicio"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
=========
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from '../src/assets/components/Start';
import Login from '../src/assets/components/Login';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../src/credenciales';
import Registro from './assets/components/Registro';
import Confirmar from './assets/components/Confirmar';
// Verifica si ya existe una instancia de Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/confirmar" element={<Confirmar />} />
      </Routes>
    </Router>
  );
};

export default App;


 

>>>>>>>>> Temporary merge branch 2
