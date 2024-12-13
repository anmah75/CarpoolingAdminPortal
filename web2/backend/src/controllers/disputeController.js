const Dispute = require('../models/Dispute');

exports.getDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find().populate('user', 'name type');
    res.json(disputes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.createDispute = async (req, res) => {
  try {
    const { description } = req.body;
    const newDispute = new Dispute({
      user: req.user.id,
      description,
    });

    const dispute = await newDispute.save();
    res.json(dispute);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.resolveDispute = async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ message: 'Dispute not found' });
    }

    dispute.status = 'resolved';
    await dispute.save();

    res.json(dispute);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteDispute = async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) {
      return res.status(404).json({ message: 'Dispute not found' });
    }

    await dispute.remove();
    res.json({ message: 'Dispute removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

