//in this we write how we can connect via database
import mongoose from "mongoose";

export const ConnectDB = async()=>{       //async need to be written inside a function
try{
 await mongoose.connect(process.env.MONGO_URI);
console.log("Server is connected");
}catch(error){
console.log("opps error have occured!!!!",error.message);
process.exit(1);  // it terminate the code
}
}