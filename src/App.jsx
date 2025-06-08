import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetallesPages from './pages/DetallesPages';
import Header from './component/layout/header';
import Footer from './component/layout/footer';
import { Box, CssBaseline } from '@mui/material';
import Panel from './pages/Panel';

const App = () => (
  <Router>
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:categoria" element={<DetallesPages />} />
           <Route path="/panel" element={<Panel />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  </Router>
);

export default App;
