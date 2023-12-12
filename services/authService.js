const { response } = require("../app");
const authModel = require("../models/authModel");
const  bcrypt  =  require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config.json");
const sessionModels = require("../models/sessionModels");
const { v4:uuid} = require('uuid');

module.exports={
    'login': async (body)=>{
        try {
            const modelResponce  = await authModel.login(body);

            if(modelResponce.error || !modelResponce.response){
                return {
                    error: "Invalid credentials"
                }
            }

            const login = await bcrypt.compare(body.password,modelResponce.response.dataValues.password);
            if(!login){
                return {
                    error:"invalid credentials"
                }
            }

            const isSession = await sessionModels.getSessionByUserId(modelResponce.response.dataValues.userId);


            if(isSession.error){
                return {
                    error:isSession.error
                }
            }

            const deleteSession = await sessionModels.deleteSession(modelResponce.response.dataValues.userId);
            if(deleteSession.error || !deleteSession){
                return {
                    error:'invalid user',
                }
             }



            delete modelResponce.response.dataValues.password;

            const token = jwt.sign(modelResponce.response.dataValues,config.jwt.secret,{
                expiresIn:"1h",
            });

            const sessionId = uuid();

            const session = await sessionModels.createSession(modelResponce.response.dataValues.userId,sessionId,token);
            if(session.error|| !session.response){
                return {
                    error:"invalid user"
                }
            }

            return {response:token};
        } catch (error) {
            console.log('[AUTH_LOGIN_SERVICE]',error);
            return {error};
        }
    },
    'register':(body)=>{
        try {
            const modelResponce  = authModel.register(body);
            console.log('REGISTER_MODEL_RESPONSE => ', modelResponce);

            return {response:modelResponce.response};
        } catch (error) {
            console.log('[AUTH_REGISTER__SERVICE]',error);
            return {error};
        }
    }

}