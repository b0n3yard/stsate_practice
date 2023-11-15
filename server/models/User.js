const {model,Schema} = require('mongoose')
const {hash, compare} = require('bcrypt')

const userschema = new Schema({
    username:{
        type:String,
        // required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator(val){
                return  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(val)
            },
            message(){
                return 'email address not valid'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:[ 6, 'to short']
    }
},{
    timestamps: true,
    methods:{
        async validatePass(formpass){
            const is_valid = await compare(formpass ,this.password)
            return is_valid
        }
    },
    toJSON:{
        transform(_, user){
            delete user.password
            return user
        }
    }
    
})
// userschema.methods.toJson = function(){
//     const user = {... this}
//     delete user.password
//     return user
// }
userschema.pre('save', async function(next){
    if(this.isNew){
        this.password = await hash(this.password, 10)
    }
    next()
})

const User = model('User',userschema)
module.exports= User