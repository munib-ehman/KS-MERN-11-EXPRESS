const { Op } = require('sequelize');
const { models } = require('./index') 

module.exports = {
    createUser : async (body,userId) => {
        try {   
            const user = await models.users.create({
                userId,
                ...body,
            })
            return {
                response:user
            }
        } catch (error) {
            return {
                error
            }
        }
    },
    updateUser : async (body) => {
        // delete body.email;
  
        try {   
            const user = await models.users.update(
                {
                    ...body
                },
                {
                    where:{
                        userId: body.userId
                    }
                }
            )
            // console.log(user);
            return {
                response:user
            }
        } catch (error) {
            return {
                error
            }
        }
    },
    getUserByEmail: async (email)=>{
        try {
            const user = await models.users.findOne({
                where:{
                    email:email
                }
            });

            return {
                response:user
            }            
        } catch (error) {
            return {
                error:error
            }
        }
    },
    getAllUsers : async (offset,query)=>{
        try {
            const users = await models.users.findAll({
                attributes:{
                    exclude:['password','updatedAt','createdAt',"deletedAt"]
                },
                where:[
                    {
                        ...(query.firstName ? { firstName : {[Op.substring]: query.firstName} } : true )
                    },
                    {
                        ...(query.lastName ? { lastName : {[Op.substring]: query.lastName} } : true )
                    },
                    {
                        ...(query.email ? { email : {[Op.substring]: query.email} } : true )
                    },
                ],
                order:[[query.sortValue,query.sortType]],
                offset:offset,
                limit:query.limit,
            });            
            return {
                response:users
            }
        } catch (error) {
            return {
                response:error,
            }
        }

    },
    deleteUser : async (userId) => {
        try {
            const userDelete = await models.users.destroy({
                where:{
                    userId:userId
                }
            });
            return {
                response:userDelete,
            }
            
        } catch (error) {
            return {
                error:error
            }
        }
    }
}