import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, FormControl, InputLabel,
  Select, MenuItem, Checkbox, ListItemText, OutlinedInput, FormControlLabel, Switch 
} from '@mui/material';


const OPCIONES_CLASE = ['Virtual', 'Presencial'];
const OPCIONES_PRECIO = ['Gratis', 'Pago'];
const OPCIONES_CATEGORIA = ['Técnicatura', 'Curso', 'Taller', 'Especialización'];

const EditarModal = ({ open, item, onClose, onSave }) => {
  const [form, setForm] = useState({
  nombre: '',
  nombre_formacion: '',
  duracion: '',
  precio: '',
  detalles: '',
  clase: [],
  paginaweb: '',
  facebook: '',
  validacion: '',
  category: '',
  firebaseKey: '',
  destacado: false, 
});

  useEffect(() => {
  if (item) {
    setForm({
      nombre: item.nombre || '',
      nombre_formacion: item.nombre_formacion || '',
      duracion: item.duracion || '',
      precio: item.precio || '',
      detalles: item.detalles || '',
      clase: item.clase || [],
      paginaweb: item.masdetalles?.paginaweb || '',
      facebook: item.masdetalles?.facebook || '',
      validacion: item.validacion || '',
      category: item.category || '',
      firebaseKey: item.firebaseKey || '',
      destacado: item.destacado || false, // ✅ agregado aquí
    });
  }
}, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClaseChange = (e) => {
    const {
      target: { value },
    } = e;
    setForm(prev => ({
      ...prev,
      clase: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleGuardar = () => {
    const updatedItem = {
      ...form,
      masdetalles: {
        paginaweb: form.paginaweb,
        facebook: form.facebook
      }
    };
    onSave(updatedItem);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Formación</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          name="nombre"
          fullWidth
          value={form.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Formación"
          name="nombre_formacion"
          fullWidth
          value={form.nombre_formacion}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Duración"
          name="duracion"
          fullWidth
          value={form.duracion}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="precio-label">Precio</InputLabel>
          <Select
            labelId="precio-label"
            label="Precio"
            name="precio"
            value={form.precio}
            onChange={handleChange}
          >
            {OPCIONES_PRECIO.map(op => (
              <MenuItem key={op} value={op}>{op}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Detalles"
          name="detalles"
          multiline
          rows={3}
          fullWidth
          value={form.detalles}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="clase-label">Clase</InputLabel>
          <Select
            labelId="clase-label"
            multiple
            name="clase"
            value={form.clase}
            onChange={handleClaseChange}
            input={<OutlinedInput label="Clase" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {OPCIONES_CLASE.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={form.clase.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          label="Página Web"
          name="paginaweb"
          fullWidth
          value={form.paginaweb}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Facebook"
          name="facebook"
          fullWidth
          value={form.facebook}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Validación"
          name="validacion"
          fullWidth
          value={form.validacion}
          onChange={handleChange}
        />
        <FormControlLabel
        control={
          <Switch
            checked={form.destacado}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, destacado: e.target.checked }))
            }
            name="destacado"
            color="primary"
          />
        }
        label="Destacado"
      />

        <FormControl fullWidth margin="dense">
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            label="Categoría"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {OPCIONES_CATEGORIA.map(op => (
              <MenuItem key={op} value={op}>{op}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleGuardar}
          variant="contained"
          color="primary"
          disabled={!form.nombre || !form.nombre_formacion}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarModal;
