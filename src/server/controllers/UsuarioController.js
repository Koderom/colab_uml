import { pool } from '../database/Connection.js';
import Usuario from '../models/Usuario.js';
import Empleado from '../models/Empleado.js';
import jwt from 'jsonwebtoken';
import UsuarioUseCase from '../use_cases/UsuarioUseCase.js';

export const UsuarioController = {};

UsuarioController.loginPage = (req, res) => {
    try {
        res.render('./LoginPage/LoginPage.ejs');    
    } catch (error) {
        res.status(400).send(error);
    }
}


UsuarioController.registroPage = (req, res) => {
    try {
        res.render('./RegistroPage/RegistroPage.ejs');    
    } catch (error) {
        res.status(400).send(error);
    }
}

UsuarioController.createUsuario = (req, res) => {
    try {
            
    } catch (error) {
        
    }
}


UsuarioController.getUsuario = async (req, res) => {
    try {
        res.render('./UsuarioPage/UsuarioPage.ejs', {Usuarios: Usuarios, idEmpleado: idEmpleado});
    } catch (error) {
        
    }
}

UsuarioController.login = async (req, res) => {
    try {
        const usuarioUseCase = new UsuarioUseCase();
        const result = await usuarioUseCase.login(req.body);

        if(result) res.status(200).json({token: result.token, idEmpleado: result.idEmpleado});
        else res.status(403).send("usuario/passoword no valido")
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

UsuarioController.registro = async (req, res) => {
    try {
        const usuarioUseCase = new UsuarioUseCase();
        const result = await usuarioUseCase.registrarUsuario(req.body);
        
        if(result) res.json(result);    
        else res.status(403).send("Error al registar usuario");
    } catch (error) {
        res.status(400).send(error.message);
    }
}


export default UsuarioController;