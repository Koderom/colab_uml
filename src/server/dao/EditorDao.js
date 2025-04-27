export default class EditorDao{
    constructor(connection){
        this.connection = connection;
    }

    async getEditor(idProyecto){
        
        try {
            const query = `
                SELECT v.*
                FROM view v
                inner join proyecto p on p.idview = v.id
                WHERE p.id = $1
            `;
            const params = [idProyecto];
            const response = await this.connection.query(query, params);
            if(response.rowCount > 0) return response.rows[0];
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async editorCreate(data){
        try {
            const query = `
                INSERT INTO view(jsondata)
                VALUES ($1) RETURNING id;            
            `;
            const params = ["{}"];
            const response = await this.connection.query(query, params);

            if(response.rowCount > 0) return response.rows[0].id;
            else return null;
        } catch (error) {
            throw error;
        }
    }

    async editorUpdate(data){
        try {
            const query = `
                Update view
                set jsonData = $2
                Where id = $1 ;            
            `;
            const params = [data.id , JSON.stringify(data.data)];
            const response = await this.connection.query(query, params);

            // if(response.rowCount > 0) return response.rows[0].id;
            // else return null;
        } catch (error) {
            throw error;
        }
    }
}