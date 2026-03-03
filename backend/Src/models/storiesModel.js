import mongoose from "mongoose";

const StorySchema=new mongoose.Schema({
    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    StoryMediaUrl:{
        type:String,
        required:true
    },
    viewed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Stories=mongoose.model("Stories",StorySchema)

export default Stories

