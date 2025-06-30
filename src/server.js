import dotenv from "dotenv";
import { ConnectDB } from "./config/dbConnect.js";
import app from "./app.js"
dotenv.config();
ConnectDB();
 const PORT = 8000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})

