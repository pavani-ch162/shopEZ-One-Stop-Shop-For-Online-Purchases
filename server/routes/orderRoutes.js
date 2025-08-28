import express from 'express';
import {
  fetchOrders,
  buyProduct,
  cancelOrder,
  updateOrderStatus,
  placeCartOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/fetch-orders', fetchOrders);
router.post('/buy-product', buyProduct);
router.put('/cancel-order', cancelOrder);
router.put('/update-order-status', updateOrderStatus);
router.post('/place-cart-order', placeCartOrder);

export default router;
