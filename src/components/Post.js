import { Avatar } from '@material-ui/core'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOutlined } from '@material-ui/icons'
import Modal from 'react-modal'
import React, { useEffect, useState } from 'react'
import './css/Post.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectQuestionId, selectQuestionName, setQuestionInfo } from './features/questionSlice'
import db from '../firebase'
import { selectUser } from './features/userSlice'
import firebase from 'firebase'


Modal.setAppElement("#root");

function Post({Id, question, image, timestamp, quoraUser}) {

  const user = useSelector(selectUser)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const questionId = useSelector(selectQuestionId)
  const questionName = useSelector(selectQuestionName)
  const [answer, setAnswer] = useState("")
  const [getAnswer, setGetAnswer] = useState([])

  useEffect(() => {
    if(questionId) {
      db.collection('question').doc(questionId).collection('answer').orderBy('timestamp','desc').onSnapshot
      (snapshot => setGetAnswer(snapshot.docs.map((doc) => ({
        id: doc.id,
        answer: doc.data()
      }))))
    }
  })

  const handleAnswer = (e) => {
    e.preventDefault()

    if(questionId) {
      db.collection('question').doc(questionId).collection('answer').add({
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        answer: answer,
        user: user
      })
      console.log(questionId, questionName)
      setAnswer("")
      setOpenModal(false);
    }
  }

  return (
    <div className='post'
      onClick={() => dispatch(setQuestionInfo({
        questionId: Id,
        questionName: question
      })) }>
      <div className='postInfo'>
        <Avatar 
          src = {quoraUser.photo}
        />
        <h5>{quoraUser.userName ? quoraUser.userName : quoraUser.email}</h5>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
      <div className='postBody'>
        <div className='postQuestion'>
            <p>{question}</p>
            <button onClick = {() => setOpenModal(true)}
            className='postBtnAns'>Answer</button>
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
            <div className='modal_question'>
              <h1>{question}</h1>
              <p>
                asked by <span className='name'>{quoraUser.userName ? quoraUser.userName : quoraUser.email}</span> {""}
                on <span className='name'>{new Date(timestamp?.toDate()).toLocaleString()}</span>
              </p>
            </div>
            <div className='modal_answer'>
              <textarea 
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder='Enter your answer'
              type="text" />
            </div>
            <div className='modal_buttons'>
              <button className='cancel1' onClick={() => setOpenModal(false)}>Cancel</button>
              <button type='submit' className='add1' onClick={handleAnswer}>Add Answer</button>
            </div> 
            </Modal>
        </div>
        <div className='postAnswer'>
           {
            getAnswer.map(({ id, answer}) => (
              <p 
                key={id}
                style={{position: "relative",
                  paddingBottom: "5px"}}>
                  {
                    Id === answer.questionId ? (<span>{answer.answer}<br /> 
                     <span
                      style = {{
                        position: "absolute",
                        color: "gray",
                        fontSize: "small",
                        display: "flex",
                        right: "0px",
                      }}
                     >
                      <span style={{color: "#b92b27"}}>
                        {
                          answer.user.userName ? answer.user.userName : answer.user.email 
                        }{" "} on {" "}{new Date(answer.timestamp?.toDate()).toLocaleString()}
                      </span>
                     </span>
                    </span>
                  ) : ("")}
              </p>
            ))
          }
            
        </div>
        <img src={image}/>
      </div>
      <div className='postFooter'>
        <div className='postFooterAction'>
            <ArrowUpwardOutlined />
            <ArrowDownwardOutlined />
        </div>
        <RepeatOutlined />
        <ChatBubbleOutlineOutlined />
        <div className='postFooterLeft'>
            <MoreHorizOutlined />
        </div>
      </div>  
    </div>
  )
}

export default Post
