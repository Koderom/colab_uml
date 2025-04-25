export default class EmpleadoDao{
    constructor(connection){
        this.connection = connection;
    }

    async createEmpleado(Empleado){
        try {
            const query = `
                INSERT INTO Empleado(nombre,cargo)
                VALUES ($1, $2) RETURNING id;            
            `;
            const params = [
                Empleado.nombre,
                Empleado.cargo
            ];
            const response = await this.connection.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async getEmpleado(idEmpleado){
        try {
            const query = `
                SELECT *
                FROM Empleado d
                WHERE d.id = $1 
            `;
            const params = [idEmpleado];
            const response = await connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async getEmpleadoFromProyecto(idProyecto){
        try {
            const query = `
                SELECT *
                FROM Empleado d
                inner join empleado_proyecto ep on ep.idEmpleado = d.id
                WHERE ep.idProyecto = $1
            `;
            const params = [idProyecto];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0];
            else throw new Error('empleado no encontrado');
        } catch (error) {
            throw error;
        }
    }

    async existEmpleado(idEmpleado){
        try {
            const query = `
                SELECT *
                FROM Empleado d
                WHERE d.id = $1 
            `;
            const params = [idEmpleado];
            const response = await connection.query(query, params);
            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }

    async updateEmpleado(Empleado){
        try {
            const query = `
                UPDATE Empleado
                Set nombre = $1, cargo = $2
                Where id = $3
            `;
            const params = [
                Empleado.nombre,
                Empleado.cargo,
                Empleado.id
            ];
            const response = await connection.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

}