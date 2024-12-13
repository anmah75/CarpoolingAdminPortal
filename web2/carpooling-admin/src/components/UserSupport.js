// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   //ListItemText,
//   TextField,
//   Button,
//   Avatar,
// } from '@mui/material';
// import { Send } from '@mui/icons-material';
// import { getMessages, createMessage } from '../services/api';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// const UserSupport = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     fetchMessages();

//     socket.on('newMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off('newMessage');
//     };
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const data = await getMessages();
//       setMessages(data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const message = await createMessage(newMessage, true);
//       socket.emit('adminMessage', message);
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <Box sx={{ height: 'calc(100vh - 100px)' }}>
//       <Typography variant="h4" gutterBottom>
//         User Support
//       </Typography>
//       <Paper
//         sx={{
//           height: 'calc(100% - 80px)',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <List
//           sx={{
//             flex: 1,
//             overflow: 'auto',
//             p: 2,
//           }}
//         >
//           {messages.map((message) => (
//             <ListItem
//               key={message._id}
//               sx={{
//                 flexDirection: message.isAdmin ? 'row-reverse' : 'row',
//               }}
//             >
//               <Avatar src={message.user.avatar} sx={{ mr: 2 }} />
//               <Paper
//                 sx={{
//                   p: 2,
//                   maxWidth: '70%',
//                   backgroundColor: message.isAdmin ? 'primary.main' : 'grey.100',
//                   color: message.isAdmin ? 'white' : 'inherit',
//                 }}
//               >
//                 <Typography variant="subtitle2">{message.user.name}</Typography>
//                 <Typography>{message.content}</Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.7 }}>
//                   {new Date(message.timestamp).toLocaleTimeString()}
//                 </Typography>
//               </Paper>
//             </ListItem>
//           ))}
//           <div ref={messagesEndRef} />
//         </List>
//         <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSend}
//               endIcon={<Send />}
//             >
//               Send
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UserSupport;

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { Send } from '@mui/icons-material';

const dummyMessages = [
  { id: 1, content: 'Hello, I need help with my booking.', sender: 'user', timestamp: '2023-05-15T10:30:00Z' },
  { id: 2, content: 'Sure, I\'d be happy to help. What seems to be the problem?', sender: 'admin', timestamp: '2023-05-15T10:32:00Z' },
  { id: 3, content: 'I can\'t cancel my ride.', sender: 'user', timestamp: '2023-05-15T10:35:00Z' },
];

const UserSupport = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        content: newMessage,
        sender: 'admin',
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" gutterBottom>
        User Support
      </Typography>
      <Paper
        sx={{
          height: 'calc(100% - 80px)',                    //some styling
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.sender === 'admin' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar sx={{ bgcolor: message.sender === 'admin' ? 'primary.main' : 'secondary.main' }}>
                {message.sender === 'admin' ? 'A' : 'U'}
              </Avatar>
              <Paper
                sx={{                  //message box exchange
                  p: 2,
                  ml: message.sender === 'admin' ? 0 : 2,
                  mr: message.sender === 'admin' ? 2 : 0,
                  backgroundColor: message.sender === 'admin' ? 'primary.light' : 'grey.100',
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button                         //user support page editing
              variant="contained"
              color="primary"
              onClick={handleSend}
              endIcon={<Send />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserSupport;

