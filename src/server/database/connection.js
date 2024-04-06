import pg from 'pg';

export const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: 'db_colab_uml',
    user: 'postgres',
    password: '123456789'
})