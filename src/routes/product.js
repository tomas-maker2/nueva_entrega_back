import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/verifytoken.js';
import { createProduct, deleteProduct, findProductById, getAllProducts, productView, updateProduct } from '../controller/product.controller.js';

const router = express.Router();


// CREATE
router.post('/' , createProduct)
// verifyTokenAndAdmin

router.put('/:id', updateProduct)
// verifyTokenAndAdmin

// DELETE
router.delete('/:id', deleteProduct)
// verifyTokenAndAdmin

// GET PRODUCT
router.get('/find/:id', findProductById)


// GET ALL PRODUCTS
router.get('/', getAllProducts);

// VIEW PRODUCTS
router.get('/views' ,  productView)

export default router