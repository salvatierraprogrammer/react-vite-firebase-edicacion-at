import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ListCard from '../component/ListCard';
import { useGetFormacionesQuery } from '../service/ecApi';

const DetallesPages = () => {
  const { categoria } = useParams();
  const { data: formaciones = {}, isLoading, error } = useGetFormacionesQuery();

  const [tipo, setTipo] = useState('todos'); // Estado para filtro: todos, gratis, pago

  // Convertir a array
  const formacionesArray = formaciones ? Object.values(formaciones) : [];

  // Filtrar por categoría
  const formacionesFiltradas = formacionesArray.filter(
    item =>
      item &&
      item.category &&
      item.category.toLowerCase() === categoria.toLowerCase()
  );

  // Filtrar por tipo (gratis/pago)
 const formacionesFinales = formacionesFiltradas.filter(item => {
  if (tipo === 'todos') return true;
  if (tipo === 'gratis') return item.precio?.toLowerCase() === 'gratis';
  if (tipo === 'pago') return item.precio?.toLowerCase() === 'pago';
  return true;
});

  const handleChange = (event, newTipo) => {
    if (newTipo !== null) {
      setTipo(newTipo);
    }
  };

  if (isLoading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error al cargar formaciones</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}s disponibles
      </Typography>

      <ToggleButtonGroup
        value={tipo}
        exclusive
        onChange={handleChange}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="todos">Todos</ToggleButton>
        <ToggleButton value="gratis">Gratis</ToggleButton>
        <ToggleButton value="pago">Pago</ToggleButton>
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {formacionesFinales.length > 0 ? (
          formacionesFinales.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ListCard formacion={item} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 3 }}>
            No hay formaciones disponibles para esta categoría y filtro.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default DetallesPages;
