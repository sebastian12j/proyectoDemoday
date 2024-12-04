import { useState } from 'react'
 import { NavBar } from './assets/components/NavBar';
 import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/navbar" element={<NavBar />} />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App
