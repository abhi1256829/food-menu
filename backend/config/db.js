import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://abhishek:1256829@cluster0.p6ktxkz.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}