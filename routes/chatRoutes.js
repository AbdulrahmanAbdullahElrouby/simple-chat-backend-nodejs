const express = require('express');
const auth = require('../middleware/auth');
const chatController = require('../controllers/chatController');

const router = express.Router();

// @route   POST api/chat
// @desc    Create a chat
// @access  Private
router.post('/', auth, chatController.createChat);

// @route   POST api/chat/:chatId/message
// @desc    Send a message
// @access  Private
router.post('/:chatId/message', auth, chatController.sendMessage);

// @route   GET api/chat/:chatId/messages
// @desc    Get all messages in a chat
// @access  Private
router.get('/:chatId/messages', auth, chatController.getMessages);

module.exports = router;
