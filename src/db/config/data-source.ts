import 'dotenv/config';
import 'reflect-metadata'
import {DataSource} from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || '5432'),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
    ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../models/*.{ts,js}"],
    migrations: [__dirname + "/../migrations/*.{ts,js}"],
});
