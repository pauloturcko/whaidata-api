import express from 'express';
import { AppDataSource } from './data-source';
import 'dotenv/config';

const app = express();
const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully!');

        app.get('/', (req, res) => {
            res.send('DB Connected!');
        });

        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the DB:', error);
    });
