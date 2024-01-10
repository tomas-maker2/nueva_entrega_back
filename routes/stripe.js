import express from 'express';
import stripePackage from 'stripe';

const stripe = stripePackage('sk_test_51OX5uqD4sDDnwuv3H7jAPCCNBoEGZMjW86ndTer8u3mssNmr26UV87i1RSC4rSevASUm8TUs6kk6lR1Tvm9NE1et00YlsKA1bGe')

const router = express.Router()

router.post('/payment', (req,res) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr)
        } else{
            res.status(200).json(stripeRes)
        }
    })
})

export default router;
