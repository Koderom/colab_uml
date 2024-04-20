import {pool} from './../database/Connection.js'

export default class Diagrama{

    static async createDiagrama(diagrama){
        try {
            const query = `
                INSERT INTO diagrama(nombre, data, idProyecto)
                VALUES ($1, $2, $3) RETURNING id;            
            `;
            const params = [
                diagrama.nombre,
                diagrama.data,
                diagrama.idProyecto
            ];
            const response = await pool.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

    static async getDiagrama(idDiagrama){
        try {
            const query = `
                SELECT *
                FROM diagrama d
                WHERE d.id = $1 
            `;
            const params = [idDiagrama];
            const response = await pool.query(query, params);
            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            throw error;
        }
    }

    static async existDiagrama(idDiagrama){
        try {
            const query = `
                SELECT *
                FROM diagrama d
                WHERE d.id = $1 
            `;
            const params = [idDiagrama];
            const response = await pool.query(query, params);
            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }

    static async updateDiagrama(diagrama){
        try {
            const query = `
                UPDATE diagrama
                Set nombre = $1, data = $2, idproyecto = $3
                Where id = $4
            `;
            const params = [
                diagrama.nombre,
                diagrama.data,
                diagrama.idProyecto,
                diagrama.id
            ];
            const response = await pool.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

}