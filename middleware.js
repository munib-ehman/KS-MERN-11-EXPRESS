const jwt = require('jsonwebtoken');
const config = require('./config.json');
const sessionModels = require('./models/sessionModels');

module.exports = {
    auth: async (req,res,next) => {
        try {

            const token  = req.cookies.auth;

            if(!token || token === undefined){
                return res.send({
                    error:"unauthorized User",
                });
            }

            jwt.verify(token,config.jwt.secret,async (error, user)=>{

                const session =  await sessionModels.getSession(user.userId,token);
                if(session.error || !session.response){
                    return res.send({
                        error:"already logged in "
                    })
                }
                if(error){
                    return res.send({
                        error:error,
                    });
                }
                console.log("data",user);
                next();
            });

        } catch (error) {
            return res.send({
                error:"unauthorized User",
            });
        }
    }
}