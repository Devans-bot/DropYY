
import { useEffect } from 'react'
import { UseAuthStore } from './Store/authStore'
import SingleGhostLoader from './Components/GhostLoader'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import GetStarted from './Pages/getstarted'
import { Usethemestore } from './Store/themestore'
import Snappage from './Pages/snapPage'
import StoriesPage from './Pages/Stories'
import DeviceFrame from './Components/devicelayout'
import Profilepage from './Pages/Profilepage'
import { Toaster } from 'react-hot-toast'
import SendDrops from './Pages/sendDroptofrinds'


function App() {

  const {checkAuth,ischeckingauth,authUser}=UseAuthStore()

  const{theme}=Usethemestore()

  useEffect(()=>{
    if(theme){
      document.documentElement.setAttribute("data-theme",theme)
    }
  })

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(ischeckingauth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
        <SingleGhostLoader/>
      </div>
    )
  }



  return (
    <>
    <Toaster position="top-center" />
    <DeviceFrame>
       <Routes>
       <Route path='/login' element={authUser?<Home/>:<Login/>}/>
       <Route path='/Signup' element={authUser?<Home/>:<Signup/>}/>
      <Route path='/' element={authUser?<Home/>:<GetStarted/>}/>
      <Route path='/getstarted' element={authUser?<Home/>:<GetStarted/>}/>
      <Route path='/Snaps' element={authUser?<Snappage/>:<GetStarted/>}/>
      <Route path='/Stories' element={authUser?<StoriesPage/>:<GetStarted/>}/>
      <Route path='/ProfilePage' element={authUser?<Profilepage/>:<GetStarted/>}/>
      <Route path='/SendDropsToFriends' element={authUser?<SendDrops/>:<GetStarted/>}/>

    </Routes>
    </DeviceFrame>
   
    </>
  )
}

export default App
