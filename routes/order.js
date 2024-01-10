import express from 'express';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from './veifyToken.js';
import { orderModel } from '../modules/order.js';




const router = express.Router();

// CREATE
router.post('/',verifyToken ,  async (req,res) => {
    const newOrder = new orderModel(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req,res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedOrder);

    } catch (err) {
        res.status(500).json(err)
    }
})

// // DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req,res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Orden ha sido eliminado...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET USER ORDERS
router.get('/find/:userId',verifyTokenAndAuthorization , async (req,res) => {
    try {
        const orders = await orderModel.find({userId: req.params.userId});
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})


// // GET ALL 
router.get('/', verifyTokenAndAdmin , async (req,res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET MONTLY 
router.get('/income', verifyTokenAndAdmin, async(req,res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await orderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income)
    
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router