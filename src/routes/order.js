import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/verifytoken.js';
import { createOrder, deleteOrder, getAllOrders, getMothly, getUsersOrders, updateOrder } from '../controller/order.controller.js';




const router = express.Router();

// CREATE
router.post('/' ,  createOrder)
// verifyToken


// UPDATE
router.put('/:id', updateOrder)
// verifyTokenAndAdmin

// // DELETE
router.delete('/:id', deleteOrder)
// verifyTokenAndAdmin


// GET USER ORDERS
router.get('/find/:userId' , getUsersOrders)
// verifyTokenAndAuthorization

// // GET ALL 
router.get('/' , getAllOrders)
// verifyTokenAndAdmin


// GET MONTLY 
router.get('/income', getMothly)
// verifyTokenAndAdmin


export default router