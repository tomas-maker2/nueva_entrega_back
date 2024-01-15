import express from 'express';
import { userModel } from '../dto/modules/user.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'



const router = express.Router();

// REGISTRO
router.post("/register", async (req,res) => {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        // .env
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


// LOGIN

router.post('/login', async (req,res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json('Credenciales incorrectas!');
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json('Credenciales incorrectas!');
        }

        const accessToken = jwt.sign({
            id: user.id, 
            isAdmin: user.isAdmin,
        }, process.env.SECRET_KEY,
        {expiresIn:"3d"}
        )
        const { password, ...others } = user._doc;

        return res.status(200).json({...others, accessToken});
    } catch (err) {
        console.error(err);
        return res.status(500).json('Error interno del servidor');
    }
})



export default router;

