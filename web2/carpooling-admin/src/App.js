// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Box, CssBaseline } from '@mui/material';
// import Sidebar from './components/Sidebar';
// import HomePage from './pages/HomePage';
// import DisputesPage from './pages/DisputesPage';
// import ProfilesPage from './pages/ProfilesPage';
// import UsersPage from './pages/UsersPage';
// import SupportPage from './pages/SupportPage';
// import Login from './components/Login';
// import { isAuthenticated } from './services/auth';
// import './styles/global.css';

// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <CssBaseline />
//       <Box sx={{ display: 'flex' }}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="*"
//             element={
//               <PrivateRoute>
//                 <Sidebar />
//                 <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                   <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/disputes" element={<DisputesPage />} />
//                     <Route path="/profiles" element={<ProfilesPage />} />
//                     <Route path="/users" element={<UsersPage />} />
//                     <Route path="/support" element={<SupportPage />} />
//                   </Routes>
//                 </Box>
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Box>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import DisputesPage from './pages/DisputesPage';
import ProfilesPage from './pages/ProfilesPage';
import UsersPage from './pages/UsersPage';
import SupportPage from './pages/SupportPage';
import Login from './components/Login';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/disputes" element={<DisputesPage />} />
                    <Route path="/profiles" element={<ProfilesPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/support" element={<SupportPage />} />
                  </Routes>
                </Box>
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;

