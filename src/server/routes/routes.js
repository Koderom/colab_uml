import express from 'express'
import jes from 'ejs'
import DiagramaController from '../controllers/DiagramaController.js';

const routes = express.Router();

routes.get(('/'), (req, res) => {
    try {
        res.render('./EditorUml/EditorUml.ejs');
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error);
    }
    
})
//Diagrama routes
routes.post('/api/diagrama/create', DiagramaController.createDiagrama);
routes.get('/api/diagrama/get', DiagramaController.getDiagrama);

export {routes};