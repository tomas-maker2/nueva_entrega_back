import express from 'express';
import handlebars from 'express-handlebars'

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from '../src/routes/users.js'
import authRouter from '../src/routes/auth.js'
import productRouter from '../src/routes/product.js'
import cartRouter from '../src/routes/cart.js';
import orderRouter from '../src/routes/order.js';
// import stripeRouter from '../src/routes/stripe.js'
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import __direname from './utils/index.js';

const app = express();


dotenv.config()

// MONGOOSE
mongoose.connect(
    // .env
    process.env.MONGO_URL
).then(() => console.log('Conección con DB')).catch((err) => {
    console.log(err)
})

// HANDLEBARS

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.get('/' ,(req,res) =>{
    const test = {
        name: 'tomas',
        last_name: 'bolot'
    }
    res.render('index', test)
})


// SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
        title: 'Documentazao',
        description: 'Documentación',
        },
    },
    apis: [`${__direname}/docs/**/*.yaml`],
}; 

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs' , swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/products' , productRouter)
app.use('/api/carts' , cartRouter)
app.use('/api/orders' , orderRouter)
// app.use('/api/checkout' , stripeRouter)

app.listen(5000, () => {
    console.log('Servidor Backend Corriendo!')
});

