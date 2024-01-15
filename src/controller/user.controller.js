import { userModel } from "../dto/modules/user.js";


export const getAllUsers =  async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await userModel.find().sort({ _id: -1 }).limit(5) : await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUserById = async (req,res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createNewUser = async (req,res) => {
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteUser = async (req,res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Usuario eliminado...')
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUserStats = async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        
        const data = await userModel.aggregate([
            {$match: {createdAt:{$gte: lastYear} } },
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: 1}
                }
            }
        ])
        res.status(200).json(data)

    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUsersView = async (req,res) => {
    try {
        const user = await userModel.find().exec();
        const objectosSimples = user.map(item => item.toObject());
        res.render('user', {user: objectosSimples})
    } catch (err) {
        res.status(500).json(err)
    }
}

