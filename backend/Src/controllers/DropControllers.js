import Drop from "../models/Dropmodel.js"
import User from "../models/usermodel.js"
import cloudinary from "../utils/cloudinary.js"

export const postDrop=async(req,res)=>{
    try {
        const dropImage=req.file
        
        if(!dropImage)return res.status(404).json({message:"No Drop available"})
        
        const isVideo = dropImage.mimetype.startsWith("video");

        const user=await User.findById(req.user._id)
        const uploadDrop=await cloudinary.uploader.upload(dropImage.path,{
            folder:"DropYY/Drops",
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

        const newDrop=await Drop.create({
            sender:user,
            DropImage:uploadDrop.secure_url,
        })

       const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { sendDrops: newDrop._id } },
        { new: true }
         );

        res.status(200).json({
            message:"Drop created",
            dropid:newDrop._id,
            updatedUser
        })

    } catch (error) {
        console.log(error)
    }
}

export const sendDropToFriends=async(req,res)=>{
    try {
       const dropId=req.params.id
       const receivers=req.body.receivers
       console.log("BODY:", req.body);
       console.log("RECEIVERS:", req.body.receivers);

      
       if(!receivers)return res.status(404).json({message:"Select friends to send "})
        console.log(receivers)
       console.log(dropId)
      const originalDrop=await Drop.findById(dropId)
      console.log(originalDrop)
       
      if(!originalDrop)return res.status(404).json({message:"No Drop found "})
      
      const newDrops=receivers.map((receiverId)=>({
        sender:originalDrop.sender,
        receiver:receiverId,
        DropImage:originalDrop.DropImage,
        viewed:false
      }))

      const createdDrops=await Drop.insertMany(newDrops)

    const bulkUpdates = createdDrops.map((drop) => ({
      updateOne: {
        filter: { _id: drop.receiver },
        update: { $push: { receivedDrops: drop._id } }
      }
    }));

    await User.bulkWrite(bulkUpdates)

    res.status(200).json({
      message: "Drop sent 🚀",
      sentCount: createdDrops.length
    });
    } catch (error) {
       console.log(error)
    }
}

export const getReceivedDrops = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("friends", "name email ProfilePicture")
      .populate({
        path: "receivedDrops",
        populate: {
          path: "sender",
          select: "name email ProfilePicture"
        }
      });

    const receivedDrops = user.receivedDrops;

    const groupedDrops = receivedDrops.reduce((acc, drop) => {
      const senderId = drop.sender._id.toString();

      if (!acc[senderId]) {
        acc[senderId] = [];
      }

      acc[senderId].push(drop);
      return acc;

    }, {});

    const result = user.friends.map(friend => {
      const friendId = friend._id.toString();
      const friendDrops = groupedDrops[friendId] || [];

      return {
        sender: friend,
        drops: friendDrops,
        count: friendDrops.length
      };
    });

    res.status(200).json({
      friendsDrops: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const viewDrop=async(req,res)=>{
    try {
        const userId=req.user._id
        const dropId=req.params.id
        if(!dropId)return res.status(404).json({message:"No Drop id"})

        const thisDrop=await Drop.findById(dropId)
        if(!thisDrop)return res.status(404).json({message:"No Drop found "})

        const user=await User.findOne({
            _id:userId,
            receivedDrops:dropId,
        })

       if (!user) {
      return res.status(403).json({ message: "Not authorized to view this drop" });
      }
        
       if(!thisDrop.viewed){
        thisDrop.viewed=true
        await thisDrop.save()

        await User.findByIdAndUpdate(userId,{
            $pull:{receivedDrops:dropId}
        })
        await cloudinary.uploader.destroy(thisDrop.DropImage)

       return res.json({ message: "Drop viewed and deleted" });

       }else{
        res.json({message:"Already viewed"})
       }
    } catch (error) {
        console.log(error)
    }
}   