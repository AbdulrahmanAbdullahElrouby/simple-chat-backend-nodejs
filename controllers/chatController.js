const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

// @route   POST api/chat
// @desc    Create a chat
// @access  Private
exports.createChat = async (req, res) => {
  const { userId } = req.body;

  try {
    let chat = await Chat.findOne({ users: { $all: [req.user.id, userId] } });

    if (chat) {
      return res.status(200).json(chat);
    }

    chat = new Chat({
      users: [req.user.id, userId],
    });

    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST api/chat/:chatId/message
// @desc    Send a message
// @access  Private
exports.sendMessage = async (req, res) => {
  const { content } = req.body;

  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    const message = new Message({
      chat: req.params.chatId,
      sender: req.user.id,
      content,
    });

    await message.save();

    chat.messages.push(message);
    chat.lastMessage = message;
    await chat.save();

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET api/chat/:chatId/messages
// @desc    Get all messages in a chat
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender', ['name']);

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
