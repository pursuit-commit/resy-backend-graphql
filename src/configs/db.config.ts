import knex from 'knex';

export const pgKnex = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        }
        : {
            host: 'db',
            port: 5432,
            database: 'postgres',
            user: 'pursuit',
            password: 'pursuit2022',
        }

})






