// import React from 'react';
// import { Box, Typography, Grid, Paper } from '@mui/material';
// import { PeopleAlt, DirectionsCar, Report, Message } from '@mui/icons-material';

// const DashboardCard = ({ title, value, icon }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       p: 3,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     }}
//   >
//     <Box>
//       <Typography variant="h6" color="textSecondary">
//         {title}
//       </Typography>
//       <Typography variant="h4">{value}</Typography>
//     </Box>
//     <Box sx={{ color: 'primary.main' }}>{icon}</Box>
//   </Paper>
// );

// const Dashboard = () => {
//   // In a real application, you would fetch this data from your API
//   const stats = {
//     totalUsers: 1250,
//     activeDrivers: 320,
//     pendingDisputes: 15,
//     newMessages: 8,
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Dashboard
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Total Users"
//             value={stats.totalUsers}
//             icon={<PeopleAlt fontSize="large" />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Active Drivers"
//             value={stats.activeDrivers}
//             icon={<DirectionsCar fontSize="large" />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="Pending Disputes"
//             value={stats.pendingDisputes}
//             icon={<Report fontSize="large" />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <DashboardCard
//             title="New Messages"
//             value={stats.newMessages}
//             icon={<Message fontSize="large" />}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PeopleAlt, DirectionsCar, Report, Message } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Box>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Box>
    <Box sx={{ color: 'primary.main' }}>{icon}</Box>
  </Paper>
);

const data = [
  { name: 'Jan', users: 400, rides: 240 },
  { name: 'Feb', users: 300, rides: 139 },
  { name: 'Mar', users: 200, rides: 980 },
  { name: 'Apr', users: 278, rides: 390 },
  { name: 'May', users: 189, rides: 480 },
  { name: 'Jun', users: 239, rides: 380 },
];

const Dashboard = () => {
  const stats = {
    totalUsers: 1250,
    activeDrivers: 320,
    pendingDisputes: 15,
    newMessages: 8,
  };

  return (      //styling
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleAlt fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Active Drivers"
            value={stats.activeDrivers}
            icon={<DirectionsCar fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Pending Disputes"
            value={stats.pendingDisputes}
            icon={<Report fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="New Messages"
            value={stats.newMessages}
            icon={<Message fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Growth and Ride Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="rides" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

