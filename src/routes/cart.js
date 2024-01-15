import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/verifytoken.js';
import { addToCart, cartView, createCart, deleteCart, getCarts, getUserCart, processPayment, updateCart } from '../controller/cart.controller.js';



const router = express.Router();

// AGREGAR AL CARRITO
router.post('/add-to-cart'  , addToCart)
// verifyTokenAndAdmin


// PROCESA DE PAGO
router.post('/process-payment', processPayment)

// CREATE
router.post('/' , createCart)
// verifyToken


// UPDATE
router.put('/:id', updateCart)
// verifyTokenAndAuthorization


// // DELETE
router.delete('/:id', deleteCart)
// verifyTokenAndAuthorization


// // GET USER CART
router.get('/find/:userId' , getUserCart)
// verifyTokenAndAuthorization

// // GET ALL 
router.get('/' , getCarts)
// verifyTokenAndAdmin

// VIEW PRODUCTS
router.get('/views' ,  cartView)


export default router