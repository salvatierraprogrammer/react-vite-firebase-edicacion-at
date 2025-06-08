import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  AccessTime,
  MonetizationOn,
  Info,
  Language,
  Facebook,
  School,
} from '@mui/icons-material';

const ListCard = ({ formacion }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        maxWidth: 550,
        margin: 'auto',
      }}
    >
      <CardContent>
        {/* Título principal */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <School color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {formacion.nombre}
          </Typography>
        </Stack>

        {/* Subtítulo */}
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {formacion.nombre_formacion}
        </Typography>

        {/* Detalles */}
        <Stack spacing={1} sx={{ mt: 2 }}>
          {formacion.detalles && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Info fontSize="small" color="action" />
              <Typography variant="body2">{formacion.detalles}</Typography>
            </Stack>
          )}
          {formacion.duracion && (
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2">
                Duración: {formacion.duracion}
              </Typography>
            </Stack>
          )}
          {formacion.precio && (
            <Stack direction="row" spacing={1} alignItems="center">
              <MonetizationOn fontSize="small" color="action" />
              <Typography variant="body2">Precio: {formacion.precio}</Typography>
            </Stack>
          )}
        </Stack>

        {/* Tipos de clase */}
        {Array.isArray(formacion.clase) && formacion.clase.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
            {formacion.clase.map((tipo, idx) => (
              <Chip key={idx} label={tipo} color="secondary" size="small" />
            ))}
          </Stack>
        )}

        {/* Validación */}
        {formacion.validacion && (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            {formacion.validacion}
          </Typography>
        )}
      </CardContent>

      {/* Acciones con enlaces */}
      <CardActions sx={{ px: 2, pb: 2 }}>
        {formacion.masdetalles?.paginaweb && (
          <Tooltip title="Ver sitio web">
            <Button
              size="small"
              href={formacion.masdetalles.paginaweb}
              target="_blank"
              startIcon={<Language />}
            >
              Web
            </Button>
          </Tooltip>
        )}
        {formacion.masdetalles?.facebook && (
          <Tooltip title="Ver página en Facebook">
            <Button
              size="small"
              href={formacion.masdetalles.facebook}
              target="_blank"
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default ListCard;
