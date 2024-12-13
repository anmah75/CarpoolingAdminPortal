import React from 'react';
import { Box } from '@mui/material';
import UserList from '../components/UserList';

const UsersPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <UserList />
    </Box>
  );
};

export default UsersPage;

