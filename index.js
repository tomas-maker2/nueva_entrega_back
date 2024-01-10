import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import productRouter from './routes/product.js'
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import stripeRouter from './routes/stripe.js'
import cors from 'cors';

const app = express();

dotenv.config()

mongoose.connect(
    // .env
    process.env.MONGO_URL
).then(() => console.log('Conección con DB')).catch((err) => {
    console.log(err)
})

app.use(express.json());

app.use(cors());

app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/products' , productRouter)
app.use('/api/carts' , cartRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/checkout' , stripeRouter)

app.listen(5000, () => {
    console.log('Servidor Backend Corriendo!')
});

