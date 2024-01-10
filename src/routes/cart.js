import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from './veifyToken.js';
import { cartModel } from '../modules/cart.js';



const router = express.Router();

// CREATE
router.post('/',verifyToken ,  async (req,res) => {
    const newCart = new cartModel(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req,res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedCart);

    } catch (err) {
        res.status(500).json(err)
    }
})

// // DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req,res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Carrito eliminado...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// // GET USER CART
router.get('/find/:userId',verifyTokenAndAuthorization , async (req,res) => {
    try {
        const cart = await cartModel.find({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
})


// // GET ALL 
router.get('/', verifyTokenAndAdmin , async (req,res) => {
    try {
        const carts = await cartModel.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router