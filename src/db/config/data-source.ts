import 'dotenv/config';
import {DataSource} from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/db/models/*.ts"],
    migrations: ["src/db/migrations/*.ts"],
});
