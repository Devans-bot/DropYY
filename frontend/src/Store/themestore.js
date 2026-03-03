import {create} from "zustand"


export const Usethemestore=create((set,get)=>({
    theme:localStorage.getItem("theme"),

    setTheme:(data)=>{
        localStorage.setItem("theme",data)
        set({theme:data})
    }

}))