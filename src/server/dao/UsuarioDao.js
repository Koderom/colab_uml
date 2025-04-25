export default class UsuarioDao {
    
    constructor(connection) {
        this.connection = connection;
    }

    async createUsuario(Usuario) {
        try {
            const query = `
                INSERT INTO Usuario(login,password, idEmpleado)
                VALUES ($1, $2, $3) RETURNING id;            
            `;
            const params = [
                Usuario.nombre,
                Usuario.password,
                Usuario.idEmpleado
            ];
            const response = await this.connection.query(query, params);

            if (response.rowCount > 0) return response.rows[0].id;
            throw new Error("Usuario no insertado");
        } catch (error) {
            throw error;
        }
    }

    async getUsuario(idUsuario) {
        try {
            const query = `
                SELECT *
                FROM Usuario d
                WHERE d.id = $1 
            `;
            const params = [idUsuario];
            const response = await this.connection.query(query, params);
            if (response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async getUsuarioFromEmpleado(idEmpleado) {
        try {
            const query = `
                select p.*
                from Usuario p
                inner join Empleado_Usuario ep on ep.idUsuario = p.id
                where ep.idEmpleado = $1
            `;
            const params = [idEmpleado];
            const response = await this.connection.query(query, params);
            if (response.rowCount > 0) return response.rows;
            else return [];
        } catch (error) {
            throw error;
        }
    }



    async existUsuario(idUsuario) {
        try {
            const query = `
                SELECT *
                FROM Usuario d
                WHERE d.id = $1 
            `;
            const params = [idUsuario];
            const response = await connection.query(query, params);
            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }

    async existUsuarioFromLogin(login) {
        try {
            const query = `
                SELECT *
                FROM Usuario d
                WHERE d.login = $1 
            `;
            const params = [login];
            const response = await this.connection.query(query, params);
            return response.rowCount > 0
        } catch (error) {
            throw error;
        }
    }

    async updateUsuario(Usuario) {
        try {
            const query = `
                UPDATE Usuario
                Set titulo = $1, descripcion = $2
                Where id = $3
            `;
            const params = [
                Usuario.titulo,
                Usuario.descripcion,
                Usuario.id
            ];
            const response = await connection.query(query, params);

            if (response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async validarUsuario(credenciales){
        try {
            const user = await this.getUserFromName(credenciales.name);
            if(user && user.password === credenciales.password) return user;
            else throw new Error('credenciales incorrectas');
        } catch (error) {
            throw error;
        }
    }

    async getUserFromName(name){
        try {
            const query = `
                SELECT * FROM usuario WHERE usuario.login = $1
            `;
            const params = [name];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0];

            else throw new Error(`usuario: ${name} no encontrado`);
        } catch (error) {
            throw error;
        }
    }
}