import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },
    avatar:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
        required: true,
    },
    watchHistory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    },{timesStamps: true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswortCorect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        }, 
        process.env.GENERATE_ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
    )
}


userSchema.methods.refreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id
        }, 
        process.env.GENERATE_REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN})
}
  
export const User = mongoose.model("User", userSchema)