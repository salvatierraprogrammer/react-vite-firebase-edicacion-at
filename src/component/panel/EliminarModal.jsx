import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const EliminarModal = ({ open, item, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Eliminar Formación</DialogTitle>
    <DialogContent>
      <Typography>¿Seguro que deseas eliminar <strong>{item.nombre_formacion}</strong>?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button color="error" onClick={onConfirm}>Eliminar</Button>
    </DialogActions>
  </Dialog>
);

export default EliminarModal;
