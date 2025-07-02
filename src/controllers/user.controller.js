import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//access and refresh token
const generateAccessAndRefreshToken = async(userId)=>{
   try {
     const user = await User.findById(userId);
     if(!user){
         throw new ApiError(404,"User not found");
     }
     const accessToken = user.generateAccessToken();
     const refreshToken =user.generateRefereshToken();
     user.refreshToken = refreshToken;
     user.save({validateBeforeSave: false });
     return{ accessToken, refreshToken};
   } catch (error) {
    throw new ApiError(500,"Somthing went wrong while generating access and refresh token");
   }
};


const registerUser = asyncHandler(async (req, res) => {
  // res.status(201).json({ message: "Everything is okay" })

  // get user details ✅
  // validate data ✅
  // check if user is already exist or not? email, useername ✅
  // check for image and coverImage ✅
  // upload them to cloudinary ✅
  // craete user object ✅
  // remove password, refresh token
  // check user creation
  // return res
  //console.log(req.body)

  const { username, fullName, email, password } = req.body
  console.log("username: ", username);

  // if(username === "") {
  //     throw new ApiError(400, "username is required")
  // }

    if ([username, email, fullName, password].some(
        (field) => ( field?.trim() === "" )
    )) {
        throw new ApiError(400, "All fields are required");
    }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User with this email or username is already exist");
  }

  // console.log("req.files: ", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required!!!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required!!!");
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || null,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong, while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully!!!"));
});

const loginUser = asyncHandler(async(req,res)=>{
    //req body -> data
const {email, username, password} = req.body;
console.log("email",email);

    //username or email validate
    if(!username && !email){
        throw new ApiError(400, "username or email is required");
    }
    //find the user
   const user = await User.findById({
        $or:[{email,username}],
    });
    if(!user){
        throw new ApiError(404,"User dosen't exist");
    }
    //password
const isPasswordValid  = await user.isPasswordCorrect(password)
if(!isPasswordValid){
    throw new ApiError(401, "Invalid user credintials")
}
//console.log(isPasswordValid);
    //access and refresh token
const {accessToken,refreshToken} =  await generateAccessAndRefreshToken(user._id)
const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    //send cookie
    const options ={
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshtoken",refreshToken,options)
    .json(
        new ApiResponse(200,{loggedInUser, accessToken,refreshToken},
        "User Logged In successfully")
    )
});

const logoutUser = asyncHandler(async(req,res)=>{
User.findByIdAndUpdate(
  req.user._id,{
    $unset:{
      refreshToken: undefined || 1
    }
  },
  {
    new:true
  }
)
const options = {
  httpOnly: true,
  secure: true
}
return res
.status(201)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(new ApiResponse(401, ""))

})
export { registerUser,
    loginUser, logoutUser};






























// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js"
// import { User } from "../models/user.model.js"
// import { uploadOncloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js"




// const registerUser = asyncHandler(async (req, res) => {  //controller
//     // res.status(201).json({message: "Everything is okay"})
//     // })

//     //get user details  --- done
//     //validate data  ---- done
//     //check if user is already exist or not? via email, username  --done
//     // check for image and coverImage  --done
//     //upload them to cloudinary -- done
//     //create user object -- done
//     //remove password, refresh token
//     //check user creation
//     //return res


//     //get user details 
//     const { username, fullName, email, password } = req.body
//    console.log(username);

//     //validate data

//     // if(username === ""){
//     //     throw new ApiError(400, "username is required")
//     // }

//     // if(fullName === ""){
//     //     throw new ApiError(400, "fullName is required")
//     // }

//     // if(email === ""){
//     //     throw new ApiError(400, "email is required")
//     // }
//     // if(password === ""){
//     //     throw new ApiError(400, "password is required")
//     // }

//     /////////////////// OR CAN USE

//     if (
//         [username, fullName, email, password].some((field) => field?.trim() === "")
//     ) {
//         throw new ApiError(400, "All field is required")
//     }

//     //check if user is already exist or not? via email, username

//     const existedUser = await User.findOne({
//         $or: [{ username, email }]
//     });

//     if (existedUser) {
//         throw new ApiError(400, "User is already exists")
//     }

//     //avathar and cover image
//     const avatarLOcalPath = req.files?.avatar[0]?.path;
//     const coverImageLocalPath = req.files?.coverImage[0]?.path;
//     if (!avatarLOcalPath) {
//         throw new ApiError(400, "Avathar is required!!")
//     }


//     //5
//     const avatar = await uploadOncloudinary(avatarLOcalPath);
//     const coverImage = await uploadOncloudinary(coverImageLocalPath);
//     if (!avatar) {
//         throw new ApiError(400, "Avathar is required")
//     }


//     //6

//     const user = await User.create({
//         username,
//         fullName,
//         email,
//         password,
//         avatar: avatar.url,
//         coverImage: coverImage?.url || null
//     });

//     const createdUser = await User.findById(user._id).select(
//         "-password -refereshToken"
//     )
//     if (!createdUser) {
//         throw new ApiError(400, " somthing went wrong, while Registering the user")

//     }
//     return res.status(201).json(
//         new ApiResponse(200, createdUser, "user registered successfully!!!")
//     )

// });


// export {
//     registerUser
// }


//for making a project the changes will be in 
//schema  
//controlers
//routes