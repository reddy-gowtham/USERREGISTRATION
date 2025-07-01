import express from "express";  //express is a frame work 
import UserRoute from "./routes/user.routes.js"

const app = express();    //we have to use a variable

app.use(express.urlencoded());  //accept the data in the url form
app.use(express.json());    //accept the data in the json form

app.use('/api/v1/users',UserRoute);  //  /api/v1/todos  -- for security purpose   //todoRoutes is used because we can use method like create, update , delete and etc

export default app; 