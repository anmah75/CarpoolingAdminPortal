import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,                            //necessary imports
  List,
  ListItem,
  ListItemIcon,
  ListItemText,   
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard,
  Report,
  Person,
  People,
  Message,
  ExitToApp,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Disputes', icon: <Report />, path: '/disputes' },              //all the available options on the dashboard
  { text: 'Profiles', icon: <Person />, path: '/profiles' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Support', icon: <Message />, path: '/support' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,                            //styling
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a1a1a',
          color: 'white',
        },
      }}                       //styling
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Carpooling Admin
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#333',
              },
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 'auto', p: 2 }}>
        <ListItem
          button
          onClick={() => {
            // Handle logout
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

