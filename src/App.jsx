import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetallesPages from './pages/DetallesPages';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import { Box, CssBaseline } from '@mui/material';
import Panel from './pages/Panel';
import ScrollToTopButton from './component/common/ScrollToTopButton';
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
      <ScrollToTopButton />
      <Footer />
    </Box>
  </Router>
);

export default App;
