// import express from 'express'
// import formidable from "express-formidable"
// import { authenticate,authorizeAdmin } from "../middleware/authMiddleware.js"
// // import checkId from "../middleware/CheckId"
// import { addProduct,updateProductDetails,removeProduct,fetchProducts,fetchProductsByID,fetchAllProducts,addProductReview,fetchTopProduct,fetchNewProducts } from "../controllers/productController.js"
// const router=express.Router()

// router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),addProduct);
// router.route('/allproducts').get(fetchAllProducts)
// router.get('/top',fetchTopProduct)
// router.get('/new',fetchNewProducts)
// router.route('/:id/reviews').post(authenticate,authorizeAdmin,addProductReview)
// router.route('/:id').get(fetchProductsByID).put(authenticate,authorizeAdmin,formidable(),updateProductDetails).delete(authenticate,authorizeAdmin,removeProduct)

// export default router


import express from 'express';
import formidable from 'express-formidable';
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,

} from '../controllers/productController.js';

import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all paginated products or Add a new product (admin only)
router
  .route('/')
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

// @desc    Get all products (non-paginated) — for admin product list
router.get('/allproducts', fetchAllProducts);

// @desc    Get top-rated products
router.get('/top', fetchTopProducts);

// @desc    Get newly added products
router.get('/new', fetchNewProducts);

// @desc    Add a review to a product
router
  .route('/:id/reviews')
  .post(authenticate, addProductReview); // No need for admin-only here — customer reviews

// @desc    Get a product by ID / update / delete
router
  .route('/:id')
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;


// import express from "express";
// import formidable from "express-formidable";
// const router = express.Router();

// // controllers
// import {
//   addProduct,
//   updateProductDetails,
//   removeProduct,
//   fetchProducts,
//   fetchProductById,
//   fetchAllProducts,
//   addProductReview,
//   fetchTopProducts,
//   fetchNewProducts,
//   filterProducts,
// } from "../controllers/productController.js";
// import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
// import checkId from "../middlewares/checkId.js";

// router
//   .route("/")
//   .get(fetchProducts)
//   .post(authenticate, authorizeAdmin, formidable(), addProduct);

// router.route("/allproducts").get(fetchAllProducts);
// router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

// router.get("/top", fetchTopProducts);
// router.get("/new", fetchNewProducts);

// router
//   .route("/:id")
//   .get(fetchProductById)
//   .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
//   .delete(authenticate, authorizeAdmin, removeProduct);

// router.route("/filtered-products").post(filterProducts);

// export default router;
