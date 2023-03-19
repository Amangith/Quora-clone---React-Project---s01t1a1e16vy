import React, { useState } from 'react'
import './css/Navbar.css'
import { Assessment, AssignmentTurnedInOutlined, ExpandMore, FeaturedPlayList, FeaturedPlayListOutlined, Home,  Language,  PeopleAltOutlined } from '@material-ui/icons'
import { NotificationsOutlined, Search, Link } from '@material-ui/icons'
import { Avatar, Button, Input } from '@material-ui/core'
import db, { auth } from '../firebase'
import { logout, selectUser } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import firebase from 'firebase/app'


function Navbar() {

  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const [input, setInput] = useState("")
  const [inputUrl, setInputUrl] = useState("")

  const handleLogout = () => {
    if(window.confirm('Are you sure to logout ?')) {
      auth.signOut().then(() => {
        dispatch(logout())
        console.log("logged out")
      })
    } 
  }

  const handleQuestion = (e) => {
    e.preventDefault()

    setOpenModal(false)

    db.collection("question").add({
      question: input,
      imageUrl: inputUrl,
      timestamp: firebase.firestore.FieldValue.
      serverTimestamp(),
      user: user
    })
    setInput("")
    setInputUrl("")
  }

  return (
    <div className='navbar'>
      <div className='qHeader'>
        <div className='qHeader_logo'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png'/>
        </div>
        <div className='qHeaderIcons'>
          <div className='qHeaderIcon'><Home /> </div>
          <div className='qHeaderIcon'><FeaturedPlayListOutlined /></div>
          <div className='qHeaderIcon'><AssignmentTurnedInOutlined /></div>
          <div className='qHeaderIcon'><PeopleAltOutlined /></div>
          <div className='qHeaderIcon'><NotificationsOutlined /></div>
        </div>
        <div className='qHeaderInput'>
          <Search />
          <input type="text" placeholder='Search Quora'/>
        </div>
        <div className='qHeaderRem'>
          <button>Try Quora+</button>
          <div className='avatar' onClick={handleLogout}><Avatar src={user?.photo} /></div>
          <div className='language'><Language /></div>
          <Button onClick={() => setOpenModal(true)}>Add Question</Button>
          <Modal
            isOpen = {openModal}
            onRequestClose = {() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style = {{
              overlay: {
                width: 700,
                height: 600,
                backgroundColor: "rgb(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-300px",
                marginLeft: "-350px",
              }
              
            }}
            >
            <div className='modal_title'>
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className='modal_info'>
              <Avatar className='avataar'
                src={user.photo}
                />
                <p>{user.displayName ? user.displayName : user.email} asked </p>
                <div className='modal_scope'>
                  <PeopleAltOutlined />
                  <p>Public</p>
                  <ExpandMore />
                </div>
            </div>
            <div className='modal_Field'>
              <Input 
              required
              value={input}
              onChange = {(e) => setInput(e.target.value)}
              type="text" 
              placeholder='Start your question with "What","How","Why",etc.'
              />
            </div>
            <div className='modal_fieldLink'>
              <Link />
              <input
              value={inputUrl}
              onChange = {(e) => setInputUrl(e.target.value)}
              type="text" 
              placeholder='Optional: include a link that gives context'
              ></input>
            </div>
            <div className='modal_buttons'>
              <button className='cancel' onClick={() => setOpenModal(false)}>Cancel</button>
              <button type='submit' className='add' onClick={handleQuestion}>Add Question</button>
            </div> 
            </Modal>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
