import React , {useState,useEffect} from 'react';
import {useDispatch} from  'react-redux'
import './App.css'
import authService from '../src/appwrite/auth'
import {login,logout} from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
function App() {
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch()


  useEffect (()=>{
     authService.getCurrectUser()
     .then((userData)=> {
      if(userData) {
           dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
     })
     .finally(()=> setLoading(false))
  },[])


  return !loading ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
    <div className="w-[90%] h-[90vh] max-w-5xl bg-white shadow-lg rounded-lg p-8 flex flex-col items-center justify-center gap-6">
      <Header />
      <main className="w-[80%] text-center">
        TODO: {/* <Outlet/> */}
      </main>
      <Footer />
    </div>
  </div>
  
  ) : null;
  
  
  
   
}

export default App
