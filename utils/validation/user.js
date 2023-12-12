const Joi = require("joi")

module.exports={
     createUserSchema: Joi.object().keys({
        firstName: Joi.string().required().min(3).max(40),
        lastName:Joi.string().required().min(3).max(40),
        email:Joi.string().email().required(),
        password: Joi.string().required().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: Joi.ref('password')
    }),
    updateUserSchema:Joi.object().keys({
        userId: Joi.string(),
        firstName: Joi.string().required().min(3).max(40),
        lastName:Joi.string().required().min(3).max(40),
        email:Joi.string(),
    }),
    
     deletUserSchema:Joi.object().keys({
        userId: Joi.string().required(),
    }),
    
     paginationSchema : Joi.object().keys({
        sortValue: Joi.valid('firstName','lastName','email'),
        sortType: Joi.valid('ASC','DESC'),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email:Joi.string().email(),
        limit: Joi.string().required().valid('2','4'),
        pageNo: Joi.string().required(),
    })
}