import express from 'express';
import {
  fetchProducts,
  fetchProductDetails,
  addNewProduct,
  updateProduct,
  fetchCategories
} from '../controllers/productController.js';

const router = express.Router();

router.get('/fetch-products', fetchProducts);
router.get('/fetch-product-details/:id', fetchProductDetails);
router.post('/add-new-product', addNewProduct);
router.put('/update-product/:id', updateProduct);
router.get('/fetch-categories', fetchCategories);

export default router;
