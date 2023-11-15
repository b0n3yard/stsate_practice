const {ApolloServer}  = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()
const {typeDefs, resolvers} = require('./schema')
// const typeDefs = `
//     type User{
//         _id: ID
//         email: String
//         createdAt: String
//         updatedAt: String
//     }
//     type Query{
//         getName(name:String): String
//         somthing(values: Int): Result
//     }
//     type Result{
//         value:Int
//     }
// `
// const resolvers = {
//     Query:{
//         getName: (_,{name}) => `hi my name is ${name}`,
//         somthing: (_, {values}) => ({value:values})
//     },
// }
// const myroutes = require('./routes')
const db = require('./config/connection')
const PORT = process.env.PORT || 3333
app.use(express.json())
app.use(cookieParser())
// app.use('/', myroutes)
const server =  new ApolloServer({
    typeDefs,
    resolvers
})
async function startServer(){
    await server.start()
    app.use('/graphql', expressMiddleware(server),{
         context(serverdata){
            req: serverdata
        }
    })
    app.use('/',  express.json())

db.on( 'open', ()=>{
    console.log('db conected')

    app.listen(PORT,()=> { console.log(`listening on ${PORT}`)})
})
}
startServer()