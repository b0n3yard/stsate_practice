// const uri = 'mongodb://localhost:27017'
// const db_name = 'store_db'
// const collectionName = 'users'
const User = require('../models/User')
const {MongoClient} = require('mongodb')
const resolvers = {
    Query:{
       users: async (_, {name})=> {
        const users = await User.find()
        return users
        },
        auser: async (_, name) =>{
            const user = User.findOne({_id: name})
            console.log(name)
        return user
    } ,
        getName: (_,{name}) => `hi my name is ${name}`,
        somthing: (_, {values}) => ({value:values})
    },
    Mutation:{
        async register(_,args,context){
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
    }
}
module.exports = resolvers
// export default resolvers