import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import session from 'express-session';
import morgan from 'morgan';
import {fileURLToPath} from 'node:url';
import fs  from 'node:fs';
import path from 'node:path';
import dbConeccion from './class/dbConnetion.js'
import gestionEstudiantes from './database/query.js'
import loginRoutes from './routes/loging.routes.js'

export const conn = new dbConeccion();
conn.connect();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logStream = fs.createWriteStream(path.join(__dirname, 'logSystem.log'));
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(session({
secret:"secret",
resave: false, // desativa la recreacion de las sessiones
saveUninitialized:false, // evita que se inicien sessiones vacias
}));
app.use(morgan("dev",{stream:logStream}));

app.get('/', (req, res) => {
    const querySQL = new gestionEstudiantes();
    querySQL.createDatabase();
    res.status(200).json({message: "Success!"});
    console.log("Bienvenidos al abismo de los lamentos");
});

app.use(
    loginRoutes
);

app.listen(3000,  () => {
    console.log("Hola Mundo");
});
