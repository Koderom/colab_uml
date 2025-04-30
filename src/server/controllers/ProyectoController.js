import Proyecto from '../models/Proyecto.js';
import { pool } from '../database/Connection.js';
import ProyectoUseCase from '../use_cases/ProyectoUseCase.js';
import EditorUseCase from '../use_cases/EditorUseCase.js';
export const ProyectoController = {};

ProyectoController.createProyecto = async (req, res) => {
    try {
        const proyectoUseCase = new ProyectoUseCase();
        const result = await proyectoUseCase.proyectoCreate(req.body);
        res.redirect(`/proyectos?idEmpleado=${result.idEmpleado}`);
    } catch (error) {
        res.status(400).send(error.message);   
    }
}

ProyectoController.unirseProyecto = async (req, res) => {
    try {
        const proyectoUseCase = new ProyectoUseCase();
        const result = await proyectoUseCase.joinProyect(req.body);
        res.redirect(`/proyectos?idEmpleado=${result.idEmpleado}`);
    } catch (error) {   
        console.log(error);
        res.status(400).send(error.message);
    }
}


ProyectoController.getProyectos = async (req, res) => {
    try {
        const proyectoUseCase = new ProyectoUseCase();
        const result = await proyectoUseCase.getProyectos(req.query);
        console.log(result);
        res.render('./ProyectoPage/ProyectoPage.ejs', result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default ProyectoController;