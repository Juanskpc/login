import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ error: "Token no encontrado"})
    }

    token = token.split(" ")[1];

    try{
        let { email, id_rol } = jwt.verify(token, process.env.JWT_SECRET);
        req.email = email;
        req.id_rol = id_rol;
        
        next();
    }catch(error){
        return res.status(401).json({ error: "Token invalido"})
    }

}

export const verificarAdmin = (req, res, next) => {
    if(req.id_rol === 1){
        return next();
    }

    return res.status(403).json({error: "El usuario no es administrador"})
}

export const verificarVeterinario = (req, res, next) => {
    if(req.id_rol === 2){
        return next();
    }

    return res.status(403).json({error: "El usuario no es veterinario"})
}

export const verificarCliente = (req, res, next) => {
    if(req.id_rol === 3){
        return next();
    }

    return res.status(403).json({error: "El usuario no es cliente"})
}