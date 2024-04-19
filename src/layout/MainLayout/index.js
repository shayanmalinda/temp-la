import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DrawerMui from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AppBarStyled from './Header/AppBarStyled';
import { Outlet } from 'react-router-dom';
import MainDrawer from './Drawer';
import { APPLICATION_CONFIG, drawerWidth } from '../../config';
import DrawerContent from './Drawer/DrawerContent';
import DrawerHeader from './Drawer/DrawerHeader';
import { useMemo } from 'react';
import HeaderContent from './Header/HeaderContent';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Footer from './Footer';
import { Paper, Stack } from '@mui/material';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  // const drawerContent = useMemo(() => <DrawerContent />, []);
  // const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      // open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <HeaderContent />
        </Toolbar>
      </AppBar>

      <DrawerMui
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader open={open} handleDrawerClose={handleDrawerClose}/>
        <Divider />
        <DrawerContent/>
      </DrawerMui>
      <Main open={open}>
        <Box component="main"
          sx={{ p: 5 }}
        // sx={{ width: '100%', flexGrow: 1, p: { xs: 1, sm: 2, }, pl: { md: 10, }, pr: { md: 10, } }}
        >
          <Outlet />
        </Box>
        {isMobile && <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <Footer />
        </Paper>}
      </Main>
    </Box>
  );
}