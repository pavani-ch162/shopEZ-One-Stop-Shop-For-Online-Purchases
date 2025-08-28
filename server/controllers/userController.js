import bcrypt from 'bcrypt';
import { User } from '../models/Schema.js';

export const registerUser = async (req, res) => {
  const { username, email, usertype, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, usertype, password: hashedPassword });
    const userCreated = await newUser.save();
    res.status(201).json(userCreated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};
