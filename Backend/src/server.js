//#region  Imports    
    import express from 'express';
    import cors from 'cors';
    import bodyParser from 'body-parser';
    import helmet from 'helmet';
    import morgan from 'morgan';
    import {fileURLToPath} from 'node:url';
    import fs  from 'node:fs';
    import path from 'node:path';
//#endregion

// import dbConeccion from './class/dbConnetion.js'
// import gestionEstudiantes from './database/query.js'
// import loginRoutes from './routes/loging.routes.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logStream = fs.createWriteStream(path.join(__dirname, 'logSystem.log'));
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev",{stream:logStream}));


app.listen(3000,  () => {
    console.log("Hola Mundo");
});