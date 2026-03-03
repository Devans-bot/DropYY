import mongoose from "mongoose"

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
     email:{
        type:String,
        require:true
    },
    ProfilePicture:{
        type:String
    },
    CoverPhoto:{
     type:String
    },
     password:{
        type:String,
        require:true
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    friendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    sendDrops:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Drop"
    }],
    receivedDrops:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Drop"
    }],
    Story:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Story"
        }
    ],
},{
    timestamps:true
}
)

const User=mongoose.model("User",Userschema)

export default User;