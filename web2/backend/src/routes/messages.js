const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.get('/', auth, getMessages);
router.post('/', auth, createMessage);

module.exports = router;

