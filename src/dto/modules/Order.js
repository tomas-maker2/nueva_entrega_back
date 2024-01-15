import mongoose from "mongoose";

const OrderCollection = 'orden1';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String
                },
                quantity:{
                    type: Number,
                    default: 1,
                }
            }
        ],
        amount: {
            type:Number,
            required: true
        },
        address: {
            type: Object,
            required: true
        },
        status:{
            type: String,
            default: "pending"
        }
    },
    {timestamps: true}
)

const orderModel = mongoose.model(OrderCollection, OrderSchema);

export {orderModel}