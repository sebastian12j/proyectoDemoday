import { useState } from "react";
import { NavBar } from "./assets/components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./assets/components/Inicio"
import {Perfil} from "./assets/components/Perfeil"
import {SubirData} from "./assets/components/SubirData"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/subirdatos" element={<SubirData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
