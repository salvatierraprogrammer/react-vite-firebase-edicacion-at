// src/component/layout/footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      px: 1,
      mt: 'auto',
      backgroundColor: '#1976d2',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} Educacion AT. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default Footer;
