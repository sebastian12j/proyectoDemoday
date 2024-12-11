import { useState } from "react";
import { NavBar } from "./assets/components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./assets/components/Inicio"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
};

export default App;
