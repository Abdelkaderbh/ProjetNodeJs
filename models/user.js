const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs")


//preparing schema
const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String}
})

//hashing password before saving
UserSchema.pre('save',async function (next){
    const user=this
    if(user.isModified('password')){
        user.password = await bcyrpt.hash(user.password,10);
    }
    next();
})

const User = mongoose.model('User',UserSchema);
module.exports=User;