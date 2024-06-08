import {createPool} from 'mysql2/promise';

class dbConnetion{
    //#region  Credenciales base de datos
        #username = "root";
        #password = "";
        #host = "localhost";
        #database = "gestionestudiantes";
        #port = 3306;
    //#endregion

    //#region Variable de connection
        #pool;
    //#endregion 

    connecionOptions(){
        return {
            host: this.#host,
            port: this.#port,
            user: this.#username,
            password: this.#password,
            database: this.#database
        }  
    }

    connect(){
        try {
            this.#pool = createPool({
                host: this.#host,
                user: this.#username,
                password: this.#password,
                database: this.#database
            });
            console.log("conectado a mysql");
        } catch (e) {
            console.error(e);
        }
    }

    getConnection(){
        return this.#pool;
    }
}

export default dbConnetion;