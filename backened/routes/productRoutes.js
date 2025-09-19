import express from 'express';
import formidable from 'express-formidable';
import { addProduct,  updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts,
} from '../controllers/productController.js';

import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.get('/allproducts', fetchAllProducts);


router.get('/top', fetchTopProducts);


router.get('/new', fetchNewProducts);

router
  .route('/:id/reviews')
  .post(authenticate, addProductReview); 

router
  .route('/:id')
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
