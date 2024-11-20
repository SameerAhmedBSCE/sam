import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
import {app} from './src/app.js'
dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3002, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})