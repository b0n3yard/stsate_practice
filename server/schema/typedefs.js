const {ApolloServer, gql} =  require('apollo-server')


// const gql =  String.raw

const typeDefs = gql
    `type User{
        username: String
        _id: ID
        email: String
        createdAt: String
        updatedAt: String
    }
    type Query{
        users:[User]
        auser(id:String): User
        getName(name:String): String
        somthing(values: Int): Result
    }
    type Result{
        value:Int
    }
`

module.exports = typeDefs