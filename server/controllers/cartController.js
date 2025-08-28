import { Cart } from '../models/Schema.js';

export const fetchCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const addToCart = async (req, res) => {
  const { userId, title, description, mainImg, size, quantity, price, discount } = req.body;

  try {
    const item = new Cart({ userId, title, description, mainImg, size, quantity, price, discount });
    await item.save();

    res.json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const increaseCartQuantity = async (req, res) => {
  const { id } = req.body;

  try {
    const item = await Cart.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = parseInt(item.quantity) + 1;
    await item.save();

    res.json({ message: 'Incremented' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const decreaseCartQuantity = async (req, res) => {
  const { id } = req.body;

  try {
    const item = await Cart.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = parseInt(item.quantity) - 1;
    await item.save();

    res.json({ message: 'Decremented' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { id } = req.body;

  try {
    await Cart.deleteOne({ _id: id });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};
