const { models } = require(".")

module.exports = {
    createSession: async (userId,sessionId,token) => {
       try {
        const session =  await models.sessions.create({
            userId,
            sessionId,
            token
        });

        if(session.error){
            return {
                error:session.error,
            }
        }
        return {
            response:session
        }
        
       } catch (error) {
            return {
                error:error
            }
       } 
    },
    getSession: async (userId,token) => {
        try {

            const session = await models.sessions.findOne({
                where:{
                    userId:userId,
                    token:token
                }
            })

            if(session.error){
                return { 
                    error:session.error
                }
            }

            return {
                response:session
            }
            
           } catch (error) {
                return {
                    error:error
                }
           } 
    },
    getSessionByUserId : async (userId ) => {
        console.log(userId);
    try {

        const session  = await models.sessions.findOne({
            where:{
                userId:userId,
            }
        })

        // if(session.error){
        //     return {
        //         error:session.error,
        //     }
        // }

        return {
            response:session
        }

    } catch (error) {
        return {
            error:error
        }
    } 
    },
    deleteSession : async ( userId ) => {
        try {
            const session =  await models.sessions.destroy({
                where:{
                    userId:userId
                }
            })

            if(session.error){
                return {
                    error:error
                }
            }

            return {
                response:session
            }
        
        } catch (error) {
            return {
                error:error
            }
        }
    }
}