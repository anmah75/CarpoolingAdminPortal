const express = require('express');
const router = express.Router();
const {
  getDisputes,
  createDispute,
  resolveDispute,
  deleteDispute,
} = require('../controllers/disputeController');
const auth = require('../middleware/auth');

router.get('/', auth, getDisputes);
router.post('/', auth, createDispute);
router.patch('/:id/resolve', auth, resolveDispute);
router.delete('/:id', auth, deleteDispute);

module.exports = router;

