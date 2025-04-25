// import Diagrama from '../models/Diagrama.js';
import Empleado from '../models/Empleado.js';
import {pool} from './../database/Connection.js'

export const DiagramaController = {};

// DiagramaController.getDiagramas = async (req, res) => {
//     const dbClient = await pool.connect();
//     try {
//         const diagrama = new Diagrama(dbClient);
//         const empleado = new Empleado(dbClient);
//         const idProyecto = req.query.idProyecto;
//         let idEmpleado = req.query.idEmpleado;

//         if(!idEmpleado) idEmpleado = (await empleado.getEmpleadoFromProyecto(idProyecto)).idempleado;
//         const diagramas = await diagrama.getDiagramas(idProyecto);
//         res.render('./DiagramaPage/DiagramaPage.ejs', {diagramas: diagramas, idEmpleado: idEmpleado, idProyecto: idProyecto});
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//     } finally{
//         dbClient.release();
//     }
// }

// DiagramaController.createDiagrama = async (req, res) => {
//     const dbClient = await pool.connect();
//     const idProyecto = req.body.idProyecto;
    
//     try {
//         dbClient.query('BEGIN');
        
//         const diagrama = new Diagrama(dbClient);
//         const idDiagrama = await diagrama.createDiagrama({
//             nombre: req.body.nombre,
//             idProyecto: idProyecto
//         });
//         res.redirect(`/diagramas?idProyecto=${idProyecto}`);

//         dbClient.query('COMMIT');
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message);
//         dbClient.query('ROLLBACK');
//     } finally{
//         dbClient.release();
//     }
// }

export default DiagramaController;