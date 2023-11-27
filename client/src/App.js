import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LandingPage from './pages/LandingPage'
import History from './pages/History'
import Processing from './pages/Processing'
import Results from './pages/Results'
import NotFound from './pages/NotFound'

// import DragNdrop from "./DragNDrop.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />     {/* default routing */}
      </Routes>
    </BrowserRouter>
  );
}

export default App