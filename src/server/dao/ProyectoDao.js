import { pool } from '../database/Connection.js';

export default class ProyectoDao{
    constructor(connection) {
        this.connection = connection;
    }
    
    async createProyecto(Proyecto){
        try {
            const query = `
                INSERT INTO proyecto(titulo,descripcion, idview)
                VALUES ($1, $2, $3) RETURNING id;            
            `;
            const params = [
                Proyecto.titulo,
                Proyecto.descripcion,
                Proyecto.idEditor
            ];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0].id;
            else throw new Error("error al crear proyecto");
        } catch (error) {
            throw error;
        }
    }

    async asignarProyecto(idProyecto, idEmpleado){
        try {
            const query = `
                INSERT INTO empleado_proyecto(idEmpleado,idProyecto)
                VALUES ($1, $2) RETURNING id;            
            `;
            const params = [
                idEmpleado, idProyecto
            ];
            const response = await this.connection.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else throw new Error("error al asignar proyecto");
        } catch (error) {
            throw error;
        }
    }

    async isProyectoAsignado(idProyecto, idEmpleado){
        try {
            const query = `
                Select * From empleado_proyecto
                where idEmpleado = $1 and idProyecto = $2          
            `;
            const params = [
                idEmpleado, idProyecto
            ];
            const response = await this.connection.query(query, params);

            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }


    async getProyecto(idProyecto){
        try {
            const query = `
                SELECT *
                FROM Proyecto d
                WHERE d.id = $1 
            `;
            const params = [idProyecto];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async getProyectoFromEmpleado(idEmpleado){
        try {
            const query = `
                select p.*
                from Proyecto p
                inner join Empleado_Proyecto ep on ep.idProyecto = p.id
                where ep.idEmpleado = $1
            `;
            const params = [idEmpleado];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows;
            else return [];
        } catch (error) {
            throw error;
        }
    }

    async existProyecto(idProyecto){
        try {
            const query = `
                SELECT *
                FROM Proyecto d
                WHERE d.id = $1 
            `;
            const params = [idProyecto];
            const response = await connection.query(query, params);
            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }

    async updateProyecto(Proyecto){
        try {
            const query = `
                UPDATE Proyecto
                Set titulo = $1, descripcion = $2
                Where id = $3
            `;
            const params = [
                Proyecto.titulo,
                Proyecto.descripcion,
                Proyecto.id
            ];
            const response = await this.connection.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

}