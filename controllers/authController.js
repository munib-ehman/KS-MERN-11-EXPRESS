const authService = require("../services/authService");
const schema  = require('../utils/validation/auth');


module.exports={
    'login':async (req,res)=>{
        try {
            const validate = await schema.login.validateAsync(req.body);
            const loginResponse = await authService.login(validate);
            if(loginResponse.error){
                return res.send({error:loginResponse.error})
            }

            res.cookie('auth',loginResponse.response);

            return res.send({response:loginResponse.response})
        } catch (error) {
            console.log('[AUTH_CONTROLLER]',error);
            return res.send({error:error});   
        }
    },
    'register': async (req,res) => {
        try {
            const validate = await schema.register.validateAsync(req.body)
            const loginResponse = authService.register(validate);
            if(loginResponse.error){
                return res.send({error:loginResponse.error})
            }
            return res.send({response:loginResponse.response})
        } catch (error) {
            console.log('[AUTH_CONTROLLER]',error);
            return res.send({error:error});   
        }
    }
}