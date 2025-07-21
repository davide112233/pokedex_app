import { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import '@fontsource/bungee';

function App() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
