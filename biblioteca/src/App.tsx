import { NavBar } from "./assets/components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Inicio } from "./assets/components/Inicio"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbar" element={<NavBar />} />
       <Route path="/" element={<Inicio />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
