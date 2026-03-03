import mongoose from "mongoose"

const DropSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    DropImage:{
        type:String,
    },
    viewed:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

const Drop=mongoose.model("Drop",DropSchema)

export default Drop