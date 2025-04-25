export default class DBUtils{

    static async executeTransaction(connection, callback) {
        try {
            await connection.query('BEGIN')
            await callback(client)
            await connection.query('COMMIT')
        } catch (e) {
            await connection.query('ROLLBACK')
            throw e
        }
    }
}