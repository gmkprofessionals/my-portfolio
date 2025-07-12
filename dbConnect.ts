import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    
    try {

        if (!process.env.MONGO_URL) {
            throw new Error("MongoDB URI not provided in environment variables.");
        }
        console.log('MongoDB URI:', process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful.");

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error while connecting to MongoDB:', error.stack || error.message);
        } else {
            console.error('Error while connecting to MongoDB:', error);
        }
        throw new Error("Error while connecting to DB.");
    }
}

export default dbConnect;