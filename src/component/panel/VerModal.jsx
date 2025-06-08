import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
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

const VerModal = ({ open, item, onClose }) => {
  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <School color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {item.nombre || 'Detalle Formación'}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Card elevation={0} sx={{ boxShadow: 'none' }}>
          <CardContent sx={{ p: 0 }}>
            {/* Nombre Formación */}
            {item.nombre_formacion && (
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {item.nombre_formacion}
              </Typography>
            )}

            {/* Detalles */}
            <Stack spacing={1} sx={{ mt: 2 }}>
              {item.detalles && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Info fontSize="small" color="action" />
                  <Typography variant="body2">{item.detalles}</Typography>
                </Stack>
              )}
              {item.duracion && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2">Duración: {item.duracion}</Typography>
                </Stack>
              )}
              {item.precio && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <MonetizationOn fontSize="small" color="action" />
                  <Typography variant="body2">Precio: {item.precio}</Typography>
                </Stack>
              )}
            </Stack>

            {/* Tipos de clase */}
            {Array.isArray(item.clase) && item.clase.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
                {item.clase.map((tipo, idx) => (
                  <Chip key={idx} label={tipo} color="secondary" size="small" />
                ))}
              </Stack>
            )}

            {/* Validación */}
            {item.validacion && (
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                {item.validacion}
              </Typography>
            )}
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        {/* Enlaces */}
        {item.masdetalles?.paginaweb && (
          <Tooltip title="Ver sitio web">
            <Button
              size="small"
              href={item.masdetalles.paginaweb}
              target="_blank"
              startIcon={<Language />}
            >
              Web
            </Button>
          </Tooltip>
        )}
        {item.masdetalles?.facebook && (
          <Tooltip title="Ver página en Facebook">
            <Button
              size="small"
              href={item.masdetalles.facebook}
              target="_blank"
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </Tooltip>
        )}

        <Button onClick={onClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerModal;
