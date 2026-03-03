import mongoose from "mongoose";

const connectDb=async()=>{
    console.log(process.env.MONGODBURI)
   try {
    await mongoose.connect(process.env.MONGODBURI,{
        dbName:"DropYY"
    })
    console.log("connected")
   } catch (error) {
    console.log("error connecting to the server")
    console.log(error)
   }
}

export default connectDb