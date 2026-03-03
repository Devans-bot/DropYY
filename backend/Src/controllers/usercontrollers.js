
import bcrypt from 'bcryptjs'
import User from '../models/usermodel.js'
import genereateToken from '../utils/generatetoken.js'
import cloudinary from '../utils/cloudinary.js'

export const signup=async(req,res)=>{
      const {name,email,password}=req.body

    try {

        if(!name || !email || !password)return res.status(404).json({message:"Provide details !"})
        
        let user = await User.findOne({email})
        if(user) return res.status(404).json({message:"Email already exists try logging in"})
        
        const coverdefault="https://res.cloudinary.com/db158yezd/image/upload/v1771023973/Gemini_Generated_Image_e8qxqbe8qxqbe8qx_dpo6sz.png"
        const hashpassword=await bcrypt.hash(password,10)
        user = await User.create({
            name,
            email,
            password:hashpassword,
            CoverPhoto:coverdefault
        })

        const randomDp=`https://api.dicebear.com/9.x/micah/svg?seed=${user._id}`
        user.ProfilePicture=randomDp
        await user.save()


        genereateToken(user._id,res)

        res.status(200).json({
            message:"User created",
            user:{
                _id:user._id,
                fullname:user.name,
                Email:user.email,
                Dp:user.ProfilePicture,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const login=async(req,res)=>{

      const {email,password}=req.body
    try {

        if(!email || !password)return res.status(404).json({message:"Provide details !"})
        
        let user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"Email does'nt exists !"})

        const pass=await bcrypt.compare(password,user.password)

        if(!pass)return res.status(404).json({message:"Wrong password !"})
       
         genereateToken(user._id,res)

        const totaldrops=user.sendDrops.length

        res.status(200).json({
            message:"Logged in ",
            user:{
                _id:user._id,
                fullname:user.name,
                Email:user.email,
                totaldrops,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const checkAuth=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId).populate("friends", "name email ProfilePicture"); 
        
        const totaldrops=user.sendDrops.length
        res.status(200).json({
            message:"Logged in ",
            user:{
                _id:user._id,
                fullname:user.name,
                Email:user.email,
                Drops:user.Drops,
                Story:user.Story,
                totaldrops,
                profileDP:user.ProfilePicture,
                coverphoto:user.CoverPhoto,
                friends:user.friends
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout=async(req,res)=>{
    try {
        res.cookie("token","",{maxAge:0})
        res.json({Message:"Loged out !"})
    } catch (error) {
        console.log(error)
    }
}

export const ProfilePicture=async(req,res)=>{
    try {
        const userId=req.user._id
        const profileDP=req.file 
        if(!profileDP)return res.status(404).json({message:"No DP found"})
        console.log(profileDP)

        const uploadResponse= await cloudinary.uploader.upload(profileDP.path,{       
            folder:"DropYY/ProfileDP",
            quality: "auto:good",
             fetch_format: "auto",
             width: 1080,
             crop: "limit",
        })

        const updatedUser= await User.findByIdAndUpdate(userId,{ProfilePicture:uploadResponse.secure_url},{new:true})
         const totaldrops=updatedUser.sendDrops.length

        res.status(200).json({
            message:"Profile updated",
            userDP:updatedUser.ProfilePicture,
             user:{
                _id:updatedUser._id,
                fullname:updatedUser.name,
                Email:updatedUser.email,
                Drops:updatedUser.Drops,
                Story:updatedUser.Story,
                totaldrops,
                profileDP:updatedUser.ProfilePicture,
                coverphoto:updatedUser.CoverPhoto,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const changeCoverPhoto=async(req,res)=>{
    try {
        const userId=req.user._id
        const coverphoto=req.file 
        if(!coverphoto)return res.status(404).json({message:"No DP found"})

        const uploadResponse= await cloudinary.uploader.upload(coverphoto.path,{       
            folder:"DropYY/coverPhoto",
            quality: "auto:good",
             fetch_format: "auto",
             width: 1080,
             crop: "limit",
        })

        const updatedUser= await User.findByIdAndUpdate(userId,{CoverPhoto:uploadResponse.secure_url},{new:true})
         const totaldrops=updatedUser.sendDrops.length

        res.status(200).json({
            message:"Profile updated",
             user:{
                _id:updatedUser._id,
                fullname:updatedUser.name,
                Email:updatedUser.email,
                Drops:updatedUser.Drops,
                Story:updatedUser.Story,
                totaldrops,
                profileDP:updatedUser.ProfilePicture,
                coverphoto:updatedUser.CoverPhoto,
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const allFriends=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).populate("friends","name email ProfilePicture");


        const friends=user.friends
         const friendsCount=friends.length

        res.status(200).json({
            friendsCount,
            friends
        })
    } catch (error) {
        console.log(error)
    }
}

export const addFriend=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId)
        let message=""


        const friendId=req.params.id
        const friendToAdd=await User.findById(friendId)

        if(friendId==userId)return res.status(200).json({message:"U cant add Yourself"})
        

        if(!friendToAdd)return res.status(404).json({message:"User not found"})
        
       if (user.friends.some(id => id.equals(friendId))) {

  // REMOVE FRIEND
  user.friends = user.friends.filter(
    (id) => !id.equals(friendId)
  )

  friendToAdd.friends = friendToAdd.friends.filter(
    (id) => !id.equals(userId)
  )

  message = "Removed friend 😖"

} else {

  // ADD FRIEND
  user.friendRequests = user.friendRequests.filter(
    (id) => !id.equals(friendId)
  )

  // prevent duplicate push
  if (!user.friends.some(id => id.equals(friendId))) {
    user.friends.push(friendId)
  }

  if (!friendToAdd.friends.some(id => id.equals(userId))) {
    friendToAdd.friends.push(userId)
  }

  message = "Added friend 😊"
}
          await user.save()
          await friendToAdd.save()
        
        const friendList=await User.findById(userId).populate("friends")

        res.status(200).json(
            {
            message,
            friendList
            }
        )

    } catch (error) {
        console.log(error)
    }
}

export const sendRequests=async(req,res)=>{
    try {
        const user= await User.findById(req.user._id).populate("name","email")
        const friendId= req.params.id
        const friend=await User.findById(friendId)
       
        if(!friend) return res.status(404).json({message:"User doesnt exists !"})

        if(user.friends.includes(friendId))
        return res.status(200).json({message:"You both are already friends 😁"})

        if(friend.friendRequests.includes(req.user._id))
        return res.status(200).json({message:"Already sent a friend request"})

        friend.friendRequests.push(user)
        await friend.save()

        res.status(200).json({message:"Request sent ☺️"})
    } catch (error) {
      console.log(error)
    }
}


export const myRequests=async(req,res)=>{
    try {
        const user= await User.findById(req.user._id).populate("friendRequests", "name email");

        
        const requests=user.friendRequests
        const requestCount=requests.length
        res.status(200).json(
            {
            requests,
            requestCount
        }
        )
    } catch (error) {
        
    }
}

export const searchFriends=async(req,res)=>{
    try {
        const {username}=req.body
        console.log(username)
        
        if(!username)return res.status(404).json({message:"No username"})

        const keyword=username.trim()
         
        const users=await User.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
            ]
        }).select("name ProfilePicture createdAt email").limit(10)

        if(users.length===0)return res.status(404).json({message:"User not found"})
       
        console.log(users)
       return res.json(users)
    } catch (error) {
     console.log(error)
    }
}