import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Cria tabelas automaticamente ( apenas em dev )
    logging: true,    // Exibe logs das queries ( debug )
    entities: ['src/entity/**/*.ts'], // Caminho para as entidades
    migrations: ['src/migration/**/*.ts'], // Caminho para migrations
});
