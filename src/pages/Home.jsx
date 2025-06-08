import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ListCard from '../component/ListCard';
import CategoryNav from '../component/CategoryNav';
import { useGetFormacionesQuery } from '../service/ecApi';

const Home = () => {
  const categorias = ['Técnicatura', 'Taller', 'Curso', 'Especialización'];
  const navigate = useNavigate();
  const { data: formaciones = {}, isLoading, error } = useGetFormacionesQuery();
  const formacionesArray = formaciones ? Object.values(formaciones) : [];
  const formacionesValidas = formacionesArray.filter(item => item && item.category);

  const irAlPanel = () => {
    navigate('/panel');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero con estilo más profesional */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 4, sm: 6 },
          mb: 6,
          background: 'linear-gradient(135deg, #1976d2, #1565c0)',
          color: 'white',
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Encuentra tu camino como Acompañante Terapéutico
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Explora tecnicaturas, cursos, talleres y especializaciones en todo Buenos Aires
        </Typography>
        <Button variant="contained" color="secondary" onClick={irAlPanel}>
          Ir al Panel de Administración
        </Button>
      </Paper>

      {/* Navegación de Categorías */}
      <Box sx={{ mb: 5 }}>
        <CategoryNav />
      </Box>

      {/* Indicadores de carga o error */}
      {isLoading && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Cargando formaciones...
          </Typography>
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          Error al cargar formaciones
        </Alert>
      )}

      {/* Secciones por categoría */}
      {!isLoading && !error && categorias.map((categoria) => {
        const itemsPorCategoria = formacionesValidas.filter(item => item.category === categoria);
        if (itemsPorCategoria.length === 0) return null;

        return (
          <Box key={categoria} id={categoria} sx={{ mt: 8 }}>
            {/* Título con separador decorativo */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold">
                {categoria}s disponibles
              </Typography>
              <Divider
                sx={{
                  width: 60,
                  height: 4,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mt: 1,
                  borderRadius: 5,
                }}
              />
            </Box>

            {/* Grid de cards limitado a 4 */}
           <Grid container spacing={4}>
            {itemsPorCategoria.slice(0, 4).map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ListCard formacion={item} />
              </Grid>
            ))}
          </Grid>
          </Box>
        );
      })}
    </Container>
  );
};

export default Home;
