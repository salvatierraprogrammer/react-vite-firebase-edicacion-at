import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import {
  School,
  MenuBook,
  WorkspacePremium,
  Psychology,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Técnicatura: <School fontSize="large" />,
  Taller: <MenuBook fontSize="large" />,
  Curso: <Psychology fontSize="large" />,
  Especialización: <WorkspacePremium fontSize="large" />,
};

const categorias = ['Técnicatura', 'Taller', 'Curso', 'Especialización'];

const CategoryNav = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = (categoria) => {
    navigate(`/categoria/${categoria}`);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
    >
      {categorias.map((categoria) => (
        <Grid
          item
          key={categoria}
          xs={12}   // 1 por fila en pantallas muy chicas
          sm={6}   // 2 por fila en pantallas pequeñas y medianas
          lg={3}   // 4 por fila en pantallas grandes
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={4}
            role="button"
            aria-label={`Ver ${categoria}s`}
            sx={{
              p: 4,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              height: 200,
              width: 250,
              cursor: 'pointer',
              transition: '0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                transform: 'translateY(-3px)',
              },
            }}
            onClick={() => handleClick(categoria)}
          >
            <Stack spacing={2} alignItems="center">
              {iconMap[categoria]}
              <Typography variant="h6" fontWeight="bold">
                {categoria}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryNav;