import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ error: "Token no encontrado"})
    }

    token = token.split(" ")[1];

    try{
        let { email } = jwt.verify(token, process.env.JWT_SECRET);
        req.email = email;
        
        next();
    }catch(error){
        return res.status(401).json({ error: "Token invalido"})
    }

}