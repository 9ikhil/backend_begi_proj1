import mongoose from "mongoose";
import  {DB_NAME}  from '../constant.js';

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(` \n MongoDB connected !! DB host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("mongoose connection Failed" , error);
        process.exit(1);
    }
}

export default connectDB;