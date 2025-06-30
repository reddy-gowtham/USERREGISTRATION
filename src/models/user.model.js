import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
   username:{
   type:String,
   required:true,
   unique: true,
   lowercase: true,
   trim:true,
   index:true
            },
                fullName:{
type:String,
required:true,
trim:true,
index:true
                },
                email:{
type: String,
required:true,
unique:true,
trim:true,
lowercase:true
                },
                avatar:{
                    type:String,
                    required:true
                },
                coverImage:{
                    type:String,
                },
                password:{
type:String,
required:[true, "password is required"]
                },
                refreshToken:{
type:String,
                },
            },
            {
                Timestamps:true,
            }
            );
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password,10)
next();
})
userSchema.methods.isPasswordCorrect = async function(){
    await bcrypt.compare(password,this.password)
}


//access token

userSchema.methods.generateAccessToken = function(){
    const token =jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    console.log("token : ", token);
    return token
}


//refresh token
userSchema.methods.generateRefreshToken = function(){
   const token = jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    console.log("token : ", token);
    return token
}

export const user = mongoose.model('user',userSchema); 


//controller is the logic part


//nmp i bcrypt
//npm i jsonwebtoken
//npm i cloudinary