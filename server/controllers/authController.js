import bcrypt from 'bcrypt';
import { User } from '../models/Schema.js';
import jwt from 'jsonwebtoken';

const generateToken = (id, usertype) => {
  return jwt.sign({ id, usertype }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id, user.usertype);
    const { password: _, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const register = async (req, res) => {
  const { username, email, usertype, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, usertype, password: hashedPassword });
    const userCreated = await newUser.save();

    const token = generateToken(userCreated._id, userCreated.usertype);
    const { password: _, ...userData } = userCreated._doc;

    res.status(201).json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
