import express from "express"
import {  addFriend, allFriends, changeCoverPhoto, checkAuth, login, logout, myRequests, ProfilePicture, searchFriends, sendRequests, signup } from "../controllers/usercontrollers.js"
import { isAuth } from "../middlewears/isauth.js"
import { getReceivedDrops, postDrop, sendDropToFriends, viewDrop } from "../controllers/DropControllers.js"
import upload from "../middlewears/multer.js"
import { seeFriendsStories, StoryUpload, viewedStoryOrNot } from "../controllers/StoryController.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/uploadDP",isAuth,upload.single("DP"),ProfilePicture)
router.post("/uploadCoverPhoto",isAuth,upload.single("coverphoto"),changeCoverPhoto)
router.get("/checkauth",isAuth,checkAuth)
router.get("/logout",logout)
router.post("/searchfriends",isAuth,searchFriends)
router.get("/allFriends",isAuth,allFriends)
router.post("/sendRequest/:id",isAuth,sendRequests)
router.get("/getRequests",isAuth,myRequests)
router.post("/addfriend/:id",isAuth,addFriend)

//Drop Routes

router.post("/postDrop",isAuth,upload.single("Drop"),postDrop)
router.get("/getReceivedDrops",isAuth,getReceivedDrops)
router.get("/viewDrop/:id",isAuth,viewDrop)
router.post("/sendDropsToFriends/:id",isAuth,sendDropToFriends)

//Story routes

router.post("/postStory",isAuth,upload.single("Story"),StoryUpload)
router.get("/friendsStories",isAuth,seeFriendsStories)
router.get("/viewStory/:id",isAuth,viewedStoryOrNot)




export default router