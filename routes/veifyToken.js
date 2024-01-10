import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err)  return res.status(403).json('Token no valido');
            req.user = user;
            next();
        })
    } else{
        return res.status(401).json('No estas autencicado')
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
        next();
        } else{
            res.status(403).json('No esta permitido hacer eso!')
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
        next();
        } else{
            res.status(403).json('No esta permitido hacer eso!')
        }
    })
}

export {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};