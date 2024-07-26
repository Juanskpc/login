import { db } from '../database/conexion.js';

const create = async(email, password, nombre_usuario) => {
    const query = {
        text: `
            INSERT INTO usuarios (email, password, nombre_usuario)
            VALUES ($1, $2, $3)
            RETURNING email, nombre_usuario, id_rol
        `,
        values: [ email, password, nombre_usuario ]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const findOneByEmail = async(email) => {
    const query = {
        text: `
            SELECT *
            FROM usuarios
            WHERE email = $1
        `,
        values: [ email ]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const getUsuarios = async () => {
    const query = {
        text: `
            SELECT *
            FROM usuarios
        `
    }

    const {rows} = await db.query(query);
    return rows;
}

const getUsuarioPorId = async (idUsuario) => {
    const query = {
        text: `
            SELECT *
            FROM usuarios
            WHERE id_usuario = $1
        `,
        values: [ idUsuario ]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const updateRolVeterinario = async (idUsuario) => {
    const query = {
        text: `
        UPDATE usuarios
        SET id_rol = 2
        WHERE id_usuario = $1
        RETURNING *
        `,
        values: [idUsuario]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

export const UsuariosModel = {
    create,
    findOneByEmail,
    getUsuarios,
    getUsuarioPorId,
    updateRolVeterinario
}