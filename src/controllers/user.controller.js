import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { user} from "../models/user.model.js"
import { uploadOncloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async(req,res)=>{  //controller
// res.status(201).json({message: "Everything is okay"})
// })

//get user details  --- done
//validate data  ---- done
//check if user is already exist or not? via email, username  --done
// check for image and coverImage  --done
//upload them to cloudinary -- done
//create user object -- done
//remove password, refresh token
//check user creation
//return res


//get user details 
const{username, fullName, email, password} =req.body
console.log(username);

//validate data

// if(username === ""){
//     throw new ApiError(400, "username is required")
// }

// if(fullName === ""){
//     throw new ApiError(400, "fullName is required")
// }

// if(email === ""){
//     throw new ApiError(400, "email is required")
// }
// if(password === ""){
//     throw new ApiError(400, "password is required")
// }

/////////////////// OR CAN USE

if(
    [username,fullName,email,password].some((field)=> field?.trim() === "")
){
    throw new ApiError(400, "All field is required")
}

//check if user is already exist or not? via email, username

const existedUser = User.findOne({
    $or: [{username, email}]
})

if(existedUser){
    throw new ApiError(400, "User is already exists")
}

//avathar and cover image
const avatarLOcalPath =req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
if(!avatarLOcalPath){
    throw new ApiError(400,"Avathar is required!!")
}


//5
const avatar = await uploadOncloudinary(avatarLOcalPath);
const coverImage = await uploadOncloudinary(coverImageLocalPath);
if(!avatar){
    throw new ApiError(400, "Avathar is required")
}


//6

const user =User.create({
username,
fullName,
email,
password,
avatar: avatar.url,
coverImage: coverImage?.url || null
})

const createdUser = User.findById(User._id).select(
    "-password -refereshToken"
)
if(!createdUser){
    throw new ApiError(400, " somthing went wrong, while Registering the user")

}
return res.status(201).json(
new ApiResponse(200, createdUser, "user registered successfully!!!")
)

})


export{
registerUser
}
