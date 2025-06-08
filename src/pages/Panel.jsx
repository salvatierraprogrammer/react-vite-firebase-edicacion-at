import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, IconButton, Box, Button,
  CircularProgress, FormControl, InputLabel, Select, MenuItem, Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import {
  useGetFormacionesQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} from '../service/ecApi';
import AgregarModal from '../component/panel/AgregarModal';
import EditarModal from '../component/panel/EditarModal';
import VerModal from '../component/panel/VerModal';
import EliminarModal from '../component/panel/EliminarModal';

const Panel = () => {
  const { data: fetchedData, error, isLoading, refetch } = useGetFormacionesQuery();
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [editItem, { isLoading: isEditing }] = useEditItemMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null); // 'add', 'edit', 'view', 'delete'
  const [filter, setFilter] = useState('');

  // Obtener categorías únicas para filtro dinámico
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      const allFirebaseKeys = Object.entries(fetchedData).map(([key, _]) => key);
      const formattedData = allFirebaseKeys.map(key => ({ firebaseKey: key, ...fetchedData[key] }));
      setData(formattedData);

      // Extraer categorías únicas para filtro (filtrar solo las permitidas si quieres)
      const uniqueCategories = [...new Set(formattedData.map(item => item.category))].filter(Boolean);
      setCategories(uniqueCategories);
    }
  }, [fetchedData]);

  const handleClose = () => {
    setAction(null);
    setSelected(null);
  };

  const handleAdd = async (newItem) => {
    try {
      await addItem(newItem).unwrap();
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error al agregar:', error);
    }
  };

  const handleEdit = async (updatedItem) => {
    try {
      const { firebaseKey, ...rest } = updatedItem;
      await editItem({ id: firebaseKey, ...rest }).unwrap();
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error al editar:', error);
    }
  };

  const handleDelete = async (itemToDelete) => {
    try {
      await deleteItem(itemToDelete.firebaseKey).unwrap();
      refetch();
      handleClose();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Filtrar datos según categoría seleccionada
  const filteredData = filter ? data.filter(item => item.category === filter) : data;

  if (isLoading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">Error al cargar los datos.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Typography variant="h4" sx={{ flexGrow: 1, minWidth: 250 }}>
          Panel de Formaciones
        </Typography>

        <Box width={250}>
          <FormControl fullWidth size="small">
            <InputLabel id="filter-label">Filtrar por Categoría</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              label="Filtrar por Categoría"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={() => setAction('add')} disabled={isAdding}>
          {isAdding ? 'Guardando...' : 'Agregar'}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 520 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Formación</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Duración</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <TableRow
                  key={item.firebaseKey}
                  hover
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
                >
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.nombre_formacion}</TableCell>
                  <TableCell>{item.duracion}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                    <Tooltip title="Ver detalles">
                      <IconButton size="small" onClick={() => { setSelected(item); setAction('view'); }} aria-label="ver">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => { setSelected(item); setAction('edit'); }} aria-label="editar">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" onClick={() => { setSelected(item); setAction('delete'); }} aria-label="eliminar" disabled={isDeleting}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modales */}
      {action === 'add' && (
        <AgregarModal open onClose={handleClose} onSave={handleAdd} />
      )}
      {action === 'edit' && selected && (
        <EditarModal open item={selected} onClose={handleClose} onSave={handleEdit} />
      )}
      {action === 'view' && selected && (
        <VerModal open item={selected} onClose={handleClose} />
      )}
      {action === 'delete' && selected && (
        <EliminarModal open item={selected} onClose={handleClose} onConfirm={() => handleDelete(selected)} />
      )}
    </Container>
  );
};

export default Panel;
