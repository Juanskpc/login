import { db } from '../database/conexion.js';

const create = async(email, password, nombre_usuario) => {
    const query = {
        text: `
            INSERT INTO usuarios (email, password, nombre_usuario)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        values: [ email, password, nombre_usuario ]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

const findOneByEmail = async(email) => {
    const query = {
        text: `
            select *
            from usuarios
            WHERE email = $1
        `,
        values: [ email ]
    }

    const {rows} = await db.query(query);
    return rows[0];
}

export const UsuariosModel = {
    create,
    findOneByEmail
}