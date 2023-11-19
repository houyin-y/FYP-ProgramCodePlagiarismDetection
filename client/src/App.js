import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LandingPage from './pages/LandingPage'
import BlankPage from './pages/BlankPage'
import Processing from './pages/Processing'
import NotFound from './pages/NotFound'

// import DragNdrop from "./DragNDrop.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/blank" element={<BlankPage />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="*" element={<NotFound />} />     {/* default routing */}
      </Routes>
    </BrowserRouter>
  );
}

export default App