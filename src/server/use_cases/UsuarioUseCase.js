import EmpleadoDao from "../dao/EmpleadoDao.js";
import UsuarioDao from "../dao/UsuarioDao.js";
import { pool } from "../database/Connection.js";
import jwt from 'jsonwebtoken';

export default class UsuarioUseCase{
       async login(body){
        const conection = await pool.connect();
        try {
            const usuarioDao = new UsuarioDao(conection);
            const credenciales = {name: body.login, password: body.password};
            const mUsuario = await usuarioDao.validarUsuario(credenciales);

            if(mUsuario){
                const token = jwt.sign({mUsuario}, process.env.SECRET_KEY);
                return {token, idEmpleado: mUsuario.idempleado};
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }finally{
            conection.release();
        }
    }

    async registrarUsuario(body) {
        const connection = await pool.connect();
        try {
            const usuarioDao = new UsuarioDao(connection);
            const empleadoDao = new EmpleadoDao(connection);
            let result = null;

            connection.query('BEGIN');

            const idEmpleado = await empleadoDao.createEmpleado({
                nombre: body.empleadoNombre, 
                cargo: body.empleadoCargo
            });

            if (idEmpleado) {
                const existUsuario = await usuarioDao.existUsuarioFromLogin(body.usuarioName);
                if (existUsuario) throw new Error("Usuario existente");

                const idUsuario = await usuarioDao.createUsuario({
                    nombre: body.usuarioName,
                    password: body.usuarioPassword,
                    idEmpleado: idEmpleado
                });

                if (idUsuario) {
                    const mUsuario = await usuarioDao.getUsuario(idUsuario);
                    const token = jwt.sign({ mUsuario }, process.env.SECRET_KEY);
                    result = { token, idEmpleado: mUsuario.idempleado }
                }
            }
            connection.query('COMMIT');

            return result;
        } catch (error) {
            console.log(error);
            connection.query('ROLLBACK');
        } finally {
            connection.release();
        }
    }
}