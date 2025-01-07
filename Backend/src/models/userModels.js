import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {type: String,required: true,lowercase: true,trim: true, index: true},
        email: {type: String,required: true,unique: true,lowecase: true,trim: true, },
        avatar: {type: String,required: true,},
        coverImage: {type: String,},
        watchHistory: [{type: Schema.Types.ObjectId,ref: "Video"}],
        password: {type: String,required: [true, 'Password is required']},
        refreshToken: {type: String},
        verifyOtp:{type:String,default:''},
        verifyOtpExpireAt:{type:Number,default:0},
        isAccountVerified:{type:Boolean,default:false},
        resetOtp:{type:String,default:""},
        resetOtpExpireAt:{type:Number,default:0},

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.GENERATE_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.GENERATE_EXPIRY_TOKEN_SECRET
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_EXPIRY_TOKEN_SECRET
        }
    )
}

export const User =mongoose.models.user || mongoose.model("User", userSchema)