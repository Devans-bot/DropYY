import {create} from "zustand"
import { axiosinstance } from "./axiosinstance"
import toast from "react-hot-toast"
import { data, useNavigate } from "react-router-dom"

export const UseAuthStore=create((set,get)=>({
    authUser:null,
    ischeckingauth:true,
    uploading:false,
    photo:null,
    loading:false,
    myDrops:[],
    friendsArray:[],
    video:null,

    setvideo:(data)=>{
      set({video:data})
    },

    setloading:(data)=>{
        set({loading:data})
    },

    checkAuth:async()=>{
        try {
            const res= await axiosinstance.get("user/checkauth")
            set({authUser:res.data.user,
                ischeckingauth:false
            })
        } catch (error) {
         set({
          ischeckingauth: false, // 👈 THIS WAS MISSING
    });        
    }
    },

    signUp:async(data)=>{
        try {
            const res= await axiosinstance.post("/user/signup",data)
            set({authUser:res.data})
            set({ischeckingauth:false})
        } catch (error) {
            console.log(error)
        }
    },
    login:async(data)=>{
        try {
            const res= await axiosinstance.post("/user/login",data)
           set({
  authUser: res.data.user,
  friendsArray: res.data.user.friends
})
            set({ischeckingauth:false})
            toast.success("Logged in")
        } catch (error) {
            console.log(error)
        }
    },
    logOut:async()=>{
        try {
            const res=await axiosinstance.get("/user/logout")
            set({authUser:null})
        } catch (error) {
            console.log(error)
        }
    },
    uploadDP: async (file) => {
    set({ uploading: true });

    try {
        const formData = new FormData();
        formData.append("DP", file); 
        // ⚠️ IMPORTANT: "profileDP" must match multer field name
const res = await axiosinstance.post(
    "/user/uploadDP",
    formData
);
        set({ authUser: res.data.user, uploading: false });
        toast.success("Profile picture updated");
    } catch (error) {
        console.log(error);
        set({ uploading: false });
    }
},
   uploadCoverphoto: async (file) => {
    set({ uploading: true });

    try {
        const formData = new FormData();
        formData.append("coverphoto", file); 
        // ⚠️ IMPORTANT: "profileDP" must match multer field name
         const res = await axiosinstance.post(
           "/user/uploadCoverPhoto",
          formData
           );
            set({ authUser: res.data.user, uploading: false });
            toast.success("Profile picture updated");
            } catch (error) {
            console.log(error);
            set({ uploading: false });
            }
     },

     sendDrop:async(photo)=>{
        try {
            console.log("called send drop")
            const formData=new FormData()
            formData.append("Drop",photo)
            const res=await axiosinstance.post("/user/postDrop",formData)
            const id=res.data.dropid
            console.log(`returing ${id}`)
            return id
            
        } catch (error) {
            console.log(error)
        }
     },

    setPhoto:(data)=>{
        set({photo:data})
    },

    sendDropToFriends:async(ids,drop)=>{
        try {
            console.log("called senddroptofriends")
            const res= await axiosinstance.post(`/user/sendDropsToFriends/${drop}`,{ receivers: ids } )
            toast.success(res.data.message)
            console.log("success")
            set({photo:null})
        } catch (error) {
            console.log(error)
        }
    },
    getMyDrops:async()=>{
        try {
            const res=await axiosinstance.get("/user/getReceivedDrops")
            set({myDrops:res.data.friendsDrops})
        } catch (error) {
            console.log(error)
        }
    },

    viewThisDrop:async(id)=>{
        try {
            const res= await axiosinstance.get(`/user/viewDrop/${id}`)
        } catch (error) {
            console.log(error)
        }
    },
    searchedFriends:async(data)=>{
        try {
           const res=await axiosinstance.post("/user/searchfriends",{username:data})
           return res.data
        } catch (error) {
            console.log(error)
        }
    },
    addFriend:async(id)=>{
        try {
            const res= await axiosinstance.post(`/user/addfriend/${id}`)
            toast.success(res.data.message)
            set({
            friendsArray: res.data.friendList.friends
            })

        } catch (error) {
            console.log(error)
        }
    },
    allFriends:async()=>{
        try {
            const res=await axiosinstance.get("/user/allFriends")
            const data=res.data.friends
            set({friendsArray:data})
            console.log(data)
        
        } catch (error) {
            console.log(error)
        }
    }
}))