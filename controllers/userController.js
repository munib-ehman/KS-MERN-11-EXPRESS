const userService = require("../services/userService");
const schema = require("../utils/validation/user");


module.exports={
    createUser:async (req,res)=>{
     try {
        const validateUser = await schema.createUserSchema.validateAsync(req.body);
        const user = await userService.createUser(validateUser);
        if(user.error){
            return {
                response:res.send(user.error)
            }
        }
        return res.send(user.response)

     } catch (error) {
        return res.send(error)
     }   
    },
    updateUser:async (req,res)=>{
     try {
        const validateUser = await schema.updateUserSchema.validateAsync(req.body);
        const user = await userService.updateUser(validateUser);
        if(user.error){
            return {
                response:res.send(user.error)
            }
        }
        return res.send(user.response)

     } catch (error) {
        return res.send(error)
     }   
    },
    getAllUsers:async (req,res) => {
        try {
            const validation = await schema.paginationSchema.validateAsync(req.query);
            const users = await userService.getAllUsers(validation);
            if(users.error){
                res.send({
                    error:users.error
                })
            }

           res.send({
                response:users.response
            })
        } catch (error) {
            return res.send(error)
        }
    },
    deleteUser: async (req,res) =>{
        try {
            const userId = await schema.deletUserSchema.validateAsync(req.query);
            const userDelete = await userService.deleteUser(userId.userId);

            if(userDelete.error){
                res.send({
                    error:userDelete.error
                })
            }

            res.send({
                response:userDelete.response
            })

            return {
                response:userDelete.response
            }
            
        } catch (error) {
            return {
                response:error
            }
        }        
    }
}