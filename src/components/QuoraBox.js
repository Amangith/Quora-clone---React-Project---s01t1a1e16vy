import {  CreateOutlined, ExpandMore, LiveHelpOutlined,  PeopleAltOutlined,  QuestionAnswerRounded } from '@material-ui/icons'
import { NotificationsOutlined, Search, Link } from '@material-ui/icons'
import { Avatar, Input } from '@material-ui/core'
import db from '../firebase'
import { selectUser } from './features/userSlice'
import {  useSelector } from 'react-redux'
import Modal from 'react-modal'
import firebase from 'firebase/app'
import React, { useState } from 'react'
import './css/QuoraBox.css'

function QuoraBox() {

  const [openModal, setOpenModal] = useState(false)
  const user = useSelector(selectUser)
  const [input, setInput] = useState("")
  const [inputUrl, setInputUrl] = useState("")

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
    <div className='quoraBox'>
      <div className='quoraBoxInfo'>
        <Avatar />
        <h5>Username</h5>
        <div className='quoraInput'>
            <input type="text" placeholder="What do you want to ask or share?"
              onClick={() => setOpenModal(true)}
             style={{width: '50%',borderRadius: '50px', padding:'10px'}}></input>
        </div>
      </div>
      <div className='other'>
        <div className='others'>
            <LiveHelpOutlined />
            <span onClick={() => setOpenModal(true)}>Ask</span> 
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
        <div className='others'>
            <QuestionAnswerRounded />
            Answer
        </div>
        <div className='others'>
            <CreateOutlined/>
            Post
        </div>
      </div>
    </div>
  )
}

export default QuoraBox
