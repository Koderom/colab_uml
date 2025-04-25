export default class EditorDao{
    constructor(connection){
        this.connection = connection;
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
}