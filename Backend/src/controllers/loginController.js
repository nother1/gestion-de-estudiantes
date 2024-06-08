import loginClass from '../class/loginClass.js'
import { ExpirationDate } from '../functions/expirationDate.function.js'; 
import { v4 as uuidv4 } from 'uuid';

export const loginConnecion = async(req,res) => {
    try {
        const loginValidate = new loginClass();
        const body = req.body;
        const values = [
            body.username,
            body.password,
        ];
        let resulLogin = await loginValidate.loginUser(values);
        if(resulLogin){
            const uuid = uuidv4();
            const status = true;
            const expiration_date = ExpirationDate();
            const user_uuid = resulLogin[0].uuid;
            const values = [
                uuid,
                status,
                expiration_date,
                user_uuid,
            ];
            let resultSession = loginValidate.sessionCreate(values);
            return await res.status(202).json({message: resultSession})
        }
      
    } catch (error) {
        console.log(error);
    }
}