import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'book',
    password: 'postshoaib',
    port: 5432,
});

client.connect();

export const query = (text, params) => client.query(text, params);
