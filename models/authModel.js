const { models } = require("./index");

module.exports = {
    login: async (body) => {
        try {
            const user = await  models.users.findOne({
                where:{
                    email:body.email
                },
                attributes:{
                    exclude:["createdAt","updateAt","deletedAt"],
                }
            })
            // console.log('LOGIN_MODEL_BODY',body);
            return {response: user}
        } catch (error) {
            console.log('[AUTH_MODEL]',error);
            return {error}
        }
    },
    register : (body) => {
        try {
            console.log('[REGISTER_MODEL_BODY]',body);
            return {responcse: 'you are registered'}
        } catch (error) {
            console.log('[REGISTER_MODEL]',error)
            return {error}
        }
    }
}