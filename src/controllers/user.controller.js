import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler((req,res,next)=>{  //controller
res.status(201).json({message: "Everything is okay"})
})



export{
registerUser

}