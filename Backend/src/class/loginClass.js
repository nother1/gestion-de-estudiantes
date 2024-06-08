import { conn } from "../main.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

class loginClass {
    async loginUser(values) {
        try {
            const connection = await conn.getConnection();
            const sql = "SELECT * FROM Users WHERE usuario = ?"
            const [result] = await connection.query(sql, values[0]);
            const compareHash = result[0].password
            if (bcrypt.compareSync(values[1], compareHash)) {
                return result;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
        }

    }
    async sessionCreate(values) {
        try {
            const connection = await conn.getConnection();
            const sql = "INSERT INTO sessions(uuid, status, expiration_date, user_uuid) VALUES(?, ?, ?, ?)"
            const [result] = await connection.query(sql, values);
            if (result.length == 0) {
                return false;
            } else if (result && result.length > 0) {
                return result;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
export default loginClass;