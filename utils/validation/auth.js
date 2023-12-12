const { json } = require("express")
const Joi = require("joi")

module.exports={
    login:(()=>{
        return Joi.object({
            email:Joi.string().required().email(),
            password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })
    })(),
    register:(()=>{
        return Joi.object({
            firstName : Joi.string().required().min(6),
            lastName : Joi.string().min(5),
            email: Joi.string().required().email(),
            password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            confirmPassword: Joi.ref('password'),
        })
    })(),
}