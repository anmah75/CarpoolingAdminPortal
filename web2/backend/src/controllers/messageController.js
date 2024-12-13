const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'name avatar');
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { content, isAdmin } = req.body;
    const newMessage = new Message({
      user: req.user.id,
      content,
      isAdmin,
    });

    const message = await newMessage.save();
    await message.populate('user', 'name avatar').execPopulate();
    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

