const {sign, verify} = require('jsonwebtoken')
const User = require('../../models/User')

async function createToken(user_id){
    try{
        const token = await sign({user_id}, process.env.JWT_SECRET)
        return token

    }catch(err){
        console.log(err.message)
    }
}

async function authenticate(req,res,next){
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).send({
            message:'Not Authorized'
        })
    }
    try{
        const data = await verify(token, process.env.JWT_SECRET,{
            maxAge:'1hr'
        })
        req.user = await User.findById(data.user_id)
        // console.log(data)
        // res.json(data)
        next()
    }catch(err){
        console.log(err)
        res.status(403).send({
            message:'token invalid'
        })
    }

}


module.exports= {createToken, authenticate}