import EditorDao from "../dao/EditorDao.js";
import ProyectoDao from "../dao/ProyectoDao.js";
import { pool } from "../database/Connection.js";
import FormartUtils from "../utils/FormatUtils.js";

export default class ProyectoUseCase{
    async proyectoCreate(data) {
        const connection = await pool.connect();
        const idEmpleado = data.idEmpleado;
        try {
            connection.query('BEGIN');
            
            const proyectoDao = new ProyectoDao(connection);
            const editorDao = new EditorDao(connection);
            const idEditor = await editorDao.editorCreate(null);

            const idProyecto = await proyectoDao.createProyecto({
                titulo: data.nombre,
                descripcion: data.descripcion,
                idEditor: idEditor
            });
            await proyectoDao.asignarProyecto(idProyecto, idEmpleado);


            connection.query('COMMIT');
            return {idProyecto, idEmpleado}
        } catch (error) {
            connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }

    async getProyectos(data){
        const connection = await pool.connect();
        try {
            const proyectoDao = new ProyectoDao(connection);
            const idEmpleado = data.idEmpleado;
            let proyectos = await proyectoDao.getProyectoFromEmpleado(idEmpleado);
            proyectos = proyectos.map( proyecto => {
                proyecto.joinCode = FormartUtils.encodeBase64(JSON.stringify(proyecto));
                return proyecto;
            });

            return {proyectos: proyectos, idEmpleado: idEmpleado}
        } catch (error) {
            throw error;
        } finally{
            connection.release();
        }
    }
    async joinProyect(data){
        const connection = await pool.connect();
        try {
            connection.query('BEGIN');
            
            const proyecto = JSON.parse(FormartUtils.decodeBase64(data.idProyecto))
            const idEmpleado = data.idEmpleado;
            const idProyecto = proyecto.id;
            const proyectoDao = new  ProyectoDao(connection);
            const isProyectoAsignado = await proyectoDao.isProyectoAsignado(idProyecto, idEmpleado);
            if(!isProyectoAsignado) await proyectoDao.asignarProyecto(idProyecto, idEmpleado);

            connection.query('COMMIT');

            return {idEmpleado, idProyecto};
        } catch (error) {
            connection.query('ROLLBACK');
            throw error;
        } finally{
            connection.release();
        }
    }
}