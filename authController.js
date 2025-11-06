const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username||!email||!password) return res.status(400).json({ msg: 'Missing' });
    if (await User.findOne({ $or:[{email},{username}] })) return res.status(400).json({ msg:'User exists' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await new User({ username, email, password: hash }).save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, username, email } });
  } catch(e){ res.status(500).json({ msg:'Server error' }) }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or:[{email:emailOrUsername},{username:emailOrUsername}] });
    if (!user) return res.status(400).json({ msg:'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg:'Invalid creds' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch(e){ res.status(500).json({ msg:'Server error' }) }
};
