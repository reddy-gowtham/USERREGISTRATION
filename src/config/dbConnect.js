//in this we write how we can connect via database
import mongoose from "mongoose";
import {DB_NAME} from "../const.js"

export const ConnectDB = async()=>{       //async need to be written inside a function
try{
 const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
console.log("Server is connected");
}catch(error){
console.log("opps error have occured!!!!",error.message);
process.exit(1);  // it terminate the code
}
}