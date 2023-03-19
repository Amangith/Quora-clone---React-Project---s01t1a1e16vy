import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/App.css';
import { login, selectUser } from './features/userSlice';
import Quora from './Quora';
import Login from './auth/Login';
import { auth } from '../firebase';



const App = () => {

const user = useSelector(selectUser)
const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser => {
      if(authUser) {
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid
        }))
        console.log(authUser)
      } 
    }))
  }, [dispatch])
  return (
    <div id="main">
      {
        user ? (<Quora />) : (<Login />)
      }
      
    </div>
  )
}


export default App;
