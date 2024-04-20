import {pool} from './../database/Connection.js'

const getUsuarios = async () => {
    try {
        const result = await pool.query(`
            Select * from usuarios
        `);
        console.table(result.rows);
    } catch (error) {
        console.error(error);
    }
}

getUsuarios();