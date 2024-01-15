import mongoose from "mongoose";
import { cartModel } from "../dto/modules/cart.js";
import { productModel } from "../dto/modules/product.js";
// import stripe from 'stripe';

// const stripeSecretKey = 'sk_test_51OX5uqD4sDDnwuv3H7jAPCCNBoEGZMjW86ndTer8u3mssNmr26UV87i1RSC4rSevASUm8TUs6kk6lR1Tvm9NE1et00YlsKA1bG'

// const stripeClient = stripe(stripeSecretKey);


// // PASARELA DE PAGO
// export const processPayment = async (req,res) => {
//     try {
//         // Lógica para procesar el pago utilizando la biblioteca de Stripe
//         const paymentIntent = await stripeClient.paymentIntents.create({
//             amount: 1000, // Monto en centavos (ejemplo: $10)
//             currency: 'usd',
//             payment_method: req.body.payment_method_id,
//             confirmation_method: 'manual',
//             confirm: true,
//         });

//         // Puedes almacenar información adicional sobre la transacción en tu base de datos.

//         res.status(200).json({ client_secret: paymentIntent.client_secret });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// AGREGAR PRODUCTO AL CARRITO
// export const addToCart = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { productId } = req.body;

//         // Obtener info del producto desde la bd
//         const product = await productModel.findById(new  mongoose.Types.ObjectId(productId));

//         if (!product) {
//             return res.status(404).json({ message: 'Producto no Encontrado' });
//         }

//         // Verificar si el usuario ya tiene carrito
//         let userCart = await cartModel.findOne({ userId: req.user._id });

//         if (!userCart) {
//             userCart = new cartModel({
//                 userId: req.user._id,
//                 products: [{ productId, quantity: 1 }]
//             });
//         } else {
//             // SI EXISTE EL CARRITO , VERIFICAR SI EL PRODUCTO YA ESTA EN EL CARRITO
//             const existingProduct = userCart.products.find(p => p.productId === productId);

//             if (existingProduct) {
//                 // SI EL PRODUCTO YA EXISTE , INCREMENTAR LA CANTIDAD
//                 existingProduct.quantity += 1;
//             } else {
//                 // SI EL PROD NO ESTA EN EL CARRITO, SE LO AGREGA
//                 userCart.products.push({ productId, quantity: 1 });
//             }
//         }

//         // GUARDAR CARRITO ACTUALIZADO EN BD
//         const updatedCart = await userCart.save();
//         res.status(200).json(updatedCart);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// };




export const createCart = async (req,res) => {
    const newCart = new cartModel(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateCart = async (req,res) => {
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
}

export const deleteCart = async (req,res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Carrito eliminado...')
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUserCart = async (req,res) => {
    try {
        const cart = await cartModel.find({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getCarts = async (req,res) => {
    try {
        const carts = await cartModel.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const cartView = async (req,res) => {
    try {
        const cart = await cartModel.find().exec()
        const objectosSimples = cart.map(item => item.toObject());
        res.render('carts', {cart: objectosSimples})
    } catch (error) {
        res.status(500).json(error)
    }
}