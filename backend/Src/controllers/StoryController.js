import Stories from "../models/storiesModel.js"
import User from "../models/usermodel.js"
import cloudinary from "../utils/cloudinary.js"


export const StoryUpload=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId)
        const mediaToUpload= req.file

        if(!mediaToUpload)return res.status(404).json({message:"No media found"})
      
      const isVideo = mediaToUpload.mimetype?.startsWith("video/");
      const mediaType= isVideo?"Video":"Image"

          const uploadResponse=await cloudinary.uploader.upload(mediaToUpload.path,{
                   folder:"DropYY/Stories",
                   quality: "auto:good",   
                   resource_type: "auto",
       
                ...(isVideo
                ? {
                  eager: [
                    { width: 1080, crop: "limit", quality: "auto" }
                 ],
                  }
                 : {
                    quality: "auto:good",
                    fetch_format: "auto",
                    width: 1080,
                    crop: "limit",
                 }),
               })

        const newStory=await Stories.create({
            Owner:userId,
            StoryMediaUrl:uploadResponse.secure_url
        })
        const updatedUser=await User.findByIdAndUpdate(userId,{Story:newStory._id})

        res.status(200).json({
            message:"Story uploaded",
            StoryData:{
                type:mediaType,
                _id:newStory._id,
                owner:{
                    name:updatedUser.name,
                    _id:newStory.Owner},
                url:newStory.StoryMediaUrl
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const seeFriendsStories=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId)   

        const listOfFriends=user.friends
        const stories=await Stories.find({
            Owner:{$in:listOfFriends}
        }).sort({createdAt:1}).populate("Owner","name _id");


    const grouped = {};

    stories.forEach((story) => {
      const ownerId = story.Owner._id.toString();

      if (!grouped[ownerId]) {
        grouped[ownerId] = {
          owner: {
            _id: story.Owner._id,
            name: story.Owner.name,
          },
          stories: [],
        };
      }

      grouped[ownerId].stories.push({
        _id: story._id,
        StoryMediaUrl: story.StoryMediaUrl,
        createdAt: story.createdAt,
      });
    });


        res.status(200).json({
            message:"Friends Stories Fetch done",
            storyOfallFriends:Object.values(grouped),
         })
    } catch (error) {
        console.log(error)
    }
}

export const viewedStoryOrNot=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId)

        const StoryId=req.params.id
        console.log(StoryId)
        const Story=await Stories.findById(StoryId)
        if(!Story)return res.status(404).json({message:"No story Found !"})

        const friendId=Story.Owner
        const friend=await User.findById(friendId).select("name")

        let viewed=null
        if(!Story.viewed){
            Story.viewed=true
            await Story.save()
            res.json({message:`Viewed Stroy of ${friend.name}`,viewed:false})
        }else{
            res.json({message:`Already Viewed Stroy of ${friend.name}`,viewed:true})
        }


    } catch (error) {
        console.log(error)
    }
}