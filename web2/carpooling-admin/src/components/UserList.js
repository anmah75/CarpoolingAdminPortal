// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   Grid,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import { getUsers } from '../services/api';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [tab, setTab] = useState(0);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const data = await getUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) => user.type === (tab === 0 ? 'driver' : 'customer')
//   );

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Users
//       </Typography>
//       <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
//         <Tab label="Drivers" />
//         <Tab label="Customers" />
//       </Tabs>
//       <Grid container spacing={3}>
//         {filteredUsers.map((user) => (
//           <Grid item xs={12} sm={6} md={4} key={user._id}>
//             <Card>
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     mb: 2,
//                   }}
//                 >
//                   <Avatar
//                     src={user.avatar}
//                     sx={{ width: 56, height: 56, mr: 2 }}
//                   />
//                   <Box>
//                     <Typography variant="h6">{user.name}</Typography>
//                     <Typography color="textSecondary">{user.email}</Typography>
//                   </Box>
//                 </Box>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: user.type === 'driver' ? 'primary.main' : 'secondary.main',
//                   }}
//                 >
//                   {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UserList;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tabs,
  Tab,
  Rating,
} from '@mui/material';
                                 //dummy users
const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, rating: 4.5, role: 'driver', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, rating: 4.8, role: 'customer', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, rating: 4.2, role: 'driver', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29, rating: 4.7, role: 'customer', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const UserList = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredUsers = dummyUsers.filter(
    (user) => tab === 0 || (tab === 1 && user.role === 'driver') || (tab === 2 && user.role === 'customer')
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All" />
        <Tab label="Drivers" />
        <Tab label="Customers" />
      </Tabs>
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{                     //allignment 
                    display: 'flex',
                    alignItems: 'center',                         //styling
                    mb: 2,
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography color="textSecondary">{user.email}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" gutterBottom>
                  Age: {user.age}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Rating:
                  </Typography>
                  <Rating value={user.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({user.rating})
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserList;

