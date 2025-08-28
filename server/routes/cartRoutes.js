import express from 'express';
import {
  fetchCartItems,
  addToCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeItemFromCart
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/fetch-cart', fetchCartItems);
router.post('/add-to-cart', addToCart);
router.put('/increase-cart-quantity', increaseCartQuantity);
router.put('/decrease-cart-quantity', decreaseCartQuantity);
router.put('/remove-item', removeItemFromCart);

export default router;
