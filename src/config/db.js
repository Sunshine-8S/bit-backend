import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log("MONGODB connected");
    } catch (error) {
        console.log("MONGODB connection failed", error);
    }
};

export default connectDB;


