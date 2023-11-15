const User = require('../models/User')
const {createToken, authenticate} =require('./helpers')
const {sign, verify} = require('jsonwebtoken')


const user_controller = {

    async register(req,res){
        try{
            const user = await User.create(req.body)
            const token = await createToken(user._id)
            
            res.cookie('token', token, {
                maxAge: 60*60*1000,
                httpOnly:true
            })
            res.json(user)
        }catch(err){
            console.log(err)
            res.status(402).send({
                message: err.message
            })
        }

    },
    async login(req,res){
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).send({
                message:'user not found'
            })
        }
        const  pass_valid = await user.validatePass(password)
        if(!pass_valid) {
            return res.status(403).send({
                message: 'invalid password'
            })
        }
        const token = await createToken(user._id)
        res.cookie('token', token, {
            maxAge: 60*60*1000,
            httpOnly:true
        })
        res.json(user)
    },
    protected(req,res){
        console.log('user', req.user)
        res.json(req.user)
    },
    async authenticated(req,res){
        const token = req.cookies.token
        if(!token){
           return res.json({user: null})
        }
        try{
            const data = await verify(token, process.env.JWT_SECRET,{
                maxAge:'1hr'
            })
            const user = await User.findById(data.user_id)
            res.json({user})
        } catch(err){
            res.json({user: null})
        }

    },
    logout(req,res){
        res.clearCookie('token')
        res.json({
            message:'logged out'
        })
    }
}


module.exports = user_controller