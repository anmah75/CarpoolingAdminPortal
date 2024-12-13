// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Grid,
// } from '@mui/material';
// import { getDisputes, resolveDispute, deleteDispute } from '../services/api';

// const DisputeList = () => {
//   const [disputes, setDisputes] = useState([]);

//   useEffect(() => {
//     fetchDisputes();
//   }, []);

//   const fetchDisputes = async () => {
//     try {
//       const data = await getDisputes();
//       setDisputes(data);
//     } catch (error) {
//       console.error('Error fetching disputes:', error);
//     }
//   };

//   const handleResolve = async (id) => {
//     try {
//       await resolveDispute(id);
//       fetchDisputes();
//     } catch (error) {
//       console.error('Error resolving dispute:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDispute(id);
//       fetchDisputes();
//     } catch (error) {
//       console.error('Error deleting dispute:', error);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Disputes
//       </Typography>
//       <Grid container spacing={3}>
//         {disputes.map((dispute) => (
//           <Grid item xs={12} md={6} key={dispute._id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{dispute.user.name}</Typography>
//                 <Typography color="textSecondary" gutterBottom>
//                   {new Date(dispute.date).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   {dispute.description}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Chip
//                     label={dispute.status}
//                     color={dispute.status === 'resolved' ? 'success' : 'warning'}
//                   />
//                   <Box>
//                     {dispute.status === 'pending' && (
//                       <Button
//                         onClick={() => handleResolve(dispute._id)}
//                         color="primary"
//                         sx={{ mr: 1 }}
//                       >
//                         Resolve
//                       </Button>
//                     )}
//                     <Button
//                       onClick={() => handleDelete(dispute._id)}
//                       color="error"
//                     >
//                       Delete
//                     </Button>
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default DisputeList;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const dummyDisputes = [
  { id: 1, user: 'John Doe', description: 'Driver was late', status: 'pending', date: '2023-05-15' },
  { id: 2, user: 'Jane Smith', description: 'Incorrect fare charged', status: 'pending', date: '2023-05-16' },
  { id: 3, user: 'Bob Johnson', description: 'Vehicle condition unsatisfactory', status: 'resolved', date: '2023-05-14' },
];

const DisputeList = () => {
  const [disputes, setDisputes] = useState(dummyDisputes);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleResolve = (id) => {
    setDisputes(disputes.map(dispute => 
      dispute.id === id ? { ...dispute, status: 'resolved' } : dispute
    ));
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    setDisputes(disputes.filter(dispute => dispute.id !== id));
    setOpenDialog(false);
  };

  const handleOpenDialog = (dispute) => {
    setSelectedDispute(dispute);
    setOpenDialog(true);
  };

  return (               //styling
    <Box>
      <Typography variant="h4" gutterBottom>
        Disputes
      </Typography>
      <Grid container spacing={3}>
        {disputes.map((dispute) => (
          <Grid item xs={12} md={6} key={dispute.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dispute.user}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {dispute.date}
                </Typography>
                <Typography variant="body1" paragraph>
                  {dispute.description}
                </Typography>
                <Box
                  sx={{                                   //styling
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    label={dispute.status}
                    color={dispute.status === 'resolved' ? 'success' : 'warning'}
                  />
                  <Button
                    onClick={() => handleOpenDialog(dispute)}
                    color="primary"
                  >
                    View Details
                  </Button>
                </Box>                                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        {selectedDispute && (
          <>
            <DialogTitle>{selectedDispute.user}'s Dispute</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>Date: {selectedDispute.date}</Typography>
              <Typography gutterBottom>Status: {selectedDispute.status}</Typography>
              <Typography gutterBottom>Description: {selectedDispute.description}</Typography>
            </DialogContent>
            <DialogActions>
              {selectedDispute.status === 'pending' && (
                <Button onClick={() => handleResolve(selectedDispute.id)} color="primary">
                  Resolve
                </Button>
              )}
              <Button onClick={() => handleDelete(selectedDispute.id)} color="error">
                Delete
              </Button>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DisputeList;

