import express from 'express';
import {appDataSource} from './db/config/data-source';
import 'dotenv/config';
import {userRouter} from "./http/routes/user-routes";


const app = express();
app.use(express.json());
const PORT = 3000;

app.use(userRouter)


appDataSource.initialize()
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
