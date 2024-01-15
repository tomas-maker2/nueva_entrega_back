import { productModel } from "../dto/modules/product.js";
import { cartModel } from "../dto/modules/cart.js";




export const createProduct = async (req,res) => {
    const newProduct = new productModel(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateProduct =  async (req,res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);

    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Producto eliminado...')
    } catch (err) {
        res.status(500).json(err)
    }
}

export const findProductById = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllProducts = async (req,res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        
        if(qNew){
            products = await productModel.find().sort({createdAt: -1}).limit(1);
        } else if(qCategory){
            products = await productModel.find({categories:{
                $in: [qCategory]
            },
        });
        } else{
            products = await productModel.find()
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const productView = async (req,res) => {
    try {
        const db = await productModel.find().exec()
        const objectosSimples = db.map(item => item.toObject());
        res.render('products', {db: objectosSimples})
    } catch (error) {
        res.status(500).json(error)
    }
}