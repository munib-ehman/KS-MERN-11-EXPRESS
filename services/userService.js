const userModels = require("../models/userModels");
const { v4:uuidV4} = require("uuid");

const  bcrypt  =  require('bcryptjs');


module.exports={
    'createUser':async (body)=>{
        try {
            const userId = uuidV4();
            body.password = await bcrypt.hash(body.password,10);
            delete body.confirmPassword;

            const isUser = await userModels.getUserByEmail(body.email);


            if(isUser.response || isUser.error){
                return {
                    error:"User with this email alreadt exist"
                }
            }

            const user = await userModels.createUser(body,userId);

            if(user.error){
                return {
                    error:user.error,
                }
            }
            return {
                response:user.response
            }
        } catch (error) {
            return {
                error,
            }
        }
    },
    updateUser : async (body)=>{
        try {
            const isUser = await userModels.getUserByEmail(body.email);
            if(!isUser.response || isUser.error){
                return {
                    error:"User does not exist"
                }
            }

            const user = await userModels.updateUser(body);

            if(user.error){
                return {
                    error:user.error,
                }
            }
            return {
                response:user.response
            }
        } catch (error) {
            return {
                error,
            }
        }
    },
    getAllUsers : async (query)=>{
        try {
            const offset = ( query.pageNo - 1) * query.limit;

            const users = await userModels.getAllUsers(offset, query);
            if(users.error){
                return {
                    error:users.error
                }
            }
            return {
                response:users.response
            }
        } catch (error) {
            return {
                error:error
            }
        }
    },
    deleteUser: async (userId) => {
        try {

            const userDelete = await userModels.deleteUser(userId);

            if(userDelete.response==1){
                return {
                    response:"User Deleted",
                }
            }else{
                return {
                    error:"something went wrong"
                }
            }
            
        } catch (error) {
            return {
                error:error
            }
        }
    }
}