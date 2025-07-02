import express from "express";  //express is a frame work 
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();    //we have to use a variable

app.use(express.urlencoded());  //accept the data in the url form
app.use(express.json());  
        //accept the data in the json form
app.use(express.static("public"))
app.use(cookieParser());

import UserRoute from "./routes/user.routes.js"
app.use('/api/v1/users',UserRoute);  //  /api/v1/todos  -- for security purpose   //todoRoutes is used because we can use method like create, update , delete and etc

export default app; 