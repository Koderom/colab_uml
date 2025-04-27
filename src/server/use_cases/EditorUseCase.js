import EditorDao from "../dao/EditorDao.js";
import { pool } from "../database/Connection.js";

export default class EditorUseCase{
    static async editorUpdate(data){
        const connection = await pool.connect()
        try {
            console.log(data);
            connection.query('BEGIN');
            const editorDao = new EditorDao(connection);
            await editorDao.editorUpdate(data);

            connection.query('COMMIT');
        } catch (error) {
            console.log(error);
            connection.query('ROLLBACK');
            throw error;
        } finally {
            connection.release();
        }
    }

    async getEditor(data){
        const connection = await pool.connect()
        try {
            const editorDao = new EditorDao(connection);
            const result = await editorDao.getEditor(data.idEditor);
            result.jsondata = JSON.parse(result.jsondata);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}