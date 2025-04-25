import express from 'express'
import DiagramaController from '../controllers/DiagramaController.js';
import ProyectoController from '../controllers/ProyectoController.js';
import UsuarioController from '../controllers/UsuarioController.js';
import EditorController from '../controllers/EditorController.js';
const routes = express.Router();

//Usuario routes
routes.post(('/test'),(req, res) => {
    console.log(req)
    res.status(300).send({req: req.body});
} )
routes.get(('/'), UsuarioController.loginPage)
routes.get(('/registro'), UsuarioController.registroPage)
routes.post('/usuario/login', UsuarioController.login);
routes.post('/usuario/registro', UsuarioController.registro);

//Proyecto routes
routes.get('/proyectos', ProyectoController.getProyectos)
routes.post('/proyecto/create', ProyectoController.createProyecto)
routes.post('/proyecto/unirse', ProyectoController.unirseProyecto)
//Editor routes
routes.get('/editor', EditorController.getEditor)
//Diagrama routes
// routes.get('/diagramas', DiagramaController.getDiagramas)
// routes.post('/diagrama/create', DiagramaController.createDiagrama);
// routes.post('/api/diagrama/create', DiagramaController.createDiagrama);
// routes.get('/api/diagrama/get', DiagramaController.getDiagrama);

export {routes};