import { UsuariosModel } from '../models/public.usuarios.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        let { nombre_usuario, email, password } = req.body;

        if (!nombre_usuario || !email || !password) {
            console.log('datos incompletos');
        }

        let usuario = await UsuariosModel.findOneByEmail(email);

        if (usuario) {
            res.status(400).json({
                ok: false,
                msg: "El email ya existe"
            })
        }

        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);

        let nuevoUsuario = await UsuariosModel.create(email, hashedPassword, nombre_usuario);

        const token = jwt.sign({
            email: nuevoUsuario.email,
            id_rol: nuevoUsuario.id_rol
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: 'Hace falta el correo o contraseña' })
        }

        let usuario = await UsuariosModel.findOneByEmail(email);

        if (!usuario) {
            return res
                .status(404)
                .json({ error: 'Usuario no encontrado' })
        }

        let infoCoincide = await bcryptjs.compare(password, usuario.password);

        if (!infoCoincide) {
            return res
                .status(404)
                .json({ error: 'Contraseña no coincide' })
        }

        const token = jwt.sign({
            email: email,
            id_rol: usuario.id_rol
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({ ok: true, msg: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }

}

let perfil = async (req, res) => {
    try {

        let usuario = await UsuariosModel.findOneByEmail(req.email);

        return res.json({ ok: true, msg: usuario })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

let obtenerUsuarios = async (req, res) => {
    try {
        let usuarios = UsuariosModel.getUsuarios();

        return res.json({ ok: true, msg: usuarios })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const updateRoleVet = async (req, res) => {
    try {
        const { idUsuario } = req.params

        const user = await UsuariosModel.getUsuarioPorId(idUsuario)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await UsuariosModel.updateRolVeterinario(idUsuario)

        return res.json({
            ok: true,
            msg: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const UsuarioController = {
    register,
    login,
    perfil,
    obtenerUsuarios,
    updateRoleVet
}