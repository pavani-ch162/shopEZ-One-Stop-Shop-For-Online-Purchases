import { Orders, Cart } from '../models/Schema.js';

export const fetchOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const buyProduct = async (req, res) => {
  const {
    userId,
    name,
    email,
    mobile,
    address,
    pincode,
    title,
    description,
    mainImg,
    size,
    quantity,
    price,
    discount,
    paymentMethod,
    orderDate
  } = req.body;

  try {
    const newOrder = new Orders({
      userId,
      name,
      email,
      mobile,
      address,
      pincode,
      title,
      description,
      mainImg,
      size,
      quantity,
      price,
      discount,
      paymentMethod,
      orderDate
    });
    await newOrder.save();

    res.json({ message: 'Order placed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const order = await Orders.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id, updateStatus } = req.body;
  try {
    const order = await Orders.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.orderStatus = updateStatus;
    await order.save();

    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

export const placeCartOrder = async (req, res) => {
  const { userId, name, mobile, email, address, pincode, paymentMethod, orderDate } = req.body;

  try {
    const cartItems = await Cart.find({ userId });

    // Use Promise.all to wait for all async operations inside map
    await Promise.all(
      cartItems.map(async (item) => {
        const newOrder = new Orders({
          userId,
          name,
          email,
          mobile,
          address,
          pincode,
          title: item.title,
          description: item.description,
          mainImg: item.mainImg,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          paymentMethod,
          orderDate
        });

        await newOrder.save();
        await Cart.deleteOne({ _id: item._id });
      })
    );

    res.json({ message: 'Order placed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occurred' });
  }
};
