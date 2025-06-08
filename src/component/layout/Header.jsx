import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Mapeo de íconos
  const iconMap = {
    Técnicatura: <SchoolIcon fontSize="large" />,
    Taller: <MenuBookIcon fontSize="large" />,
    Curso: <PsychologyIcon fontSize="large" />,
    Especialización: <WorkspacePremiumIcon fontSize="large" />,
  };

  // Array de categorías con label, icono y path
  const categorias = [
    { label: 'Técnicatura', icon: iconMap['Técnicatura'], path: 'Técnicatura' },
    { label: 'Taller', icon: iconMap['Taller'], path: 'Taller' },
    { label: 'Curso', icon: iconMap['Curso'], path: 'Curso' },
    { label: 'Especialización', icon: iconMap['Especialización'], path: 'Especialización' },
  ];

  const handleClick = (categoria) => {
    navigate(`/categoria/${categoria}`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categorias.map(({ label, icon, path }) => (
          <ListItem button key={label} onClick={() => handleClick(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Educacion AT
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {categorias.map(({ label, icon, path }) => (
              <Button
                key={label}
                color="inherit"
                startIcon={icon}
                onClick={() => handleClick(path)}
                sx={{ textTransform: 'none' }}
              >
                {label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
