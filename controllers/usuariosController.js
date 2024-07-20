import { UsuariosModel } from '../models/public.usuarios.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async(req, res) => {
    try{
        let { nombre_usuario, email, password } = req.body;

        if(!nombre_usuario || !email || !password){
            console.log('datos incompletos');
        }

        let usuario = await UsuariosModel.findOneByEmail(email);

        if(usuario){
            res.status(400).json({
                ok: false,
                msg: "El email ya existe"
            })
        }

        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);

        let nuevoUsuario = await UsuariosModel.create(email, hashedPassword, nombre_usuario);

        const token = jwt.sign({
            email: nuevoUsuario.email
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({
            ok: true,
            msg: token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const login = async(req, res) => {
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const UsuarioController = {
    register,
    login
}