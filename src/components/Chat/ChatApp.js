import React, { Fragment, useEffect, useState } from 'react'
import { getChatSession, deleteChatSession } from '../../api/chatsession'
import ChatMessages from './ChatMessages'
import ChatInputField from './ChatInputField'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const ChatAppStyles = styled.div`
    display: flex;
    flex-direction: row;
`

function ChatApp ({ chatSessionId, chatSessionName, user, history, socket }) {
  const [mode, setMode] = useState(null)
  const [messages, setMessages] = useState([])
  const [owner, setOwner] = useState('')

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = () => {
    getChatSession(chatSessionId, user)
      .then(res => {
        setMessages(res.data.chatsession.messages)
        setOwner(res.data.chatsession.owner._id)
      })
      .then()
      .catch()
  }

  const handleClose = (id) => {
    deleteChatSession(id, user)
      .then(() => history.push('/chatlobby'))
  }
  const handleEdit = () => {
    setMode('update-mode')
  }
  const handleUpdateSubmit = () => {
    setMode(null)
  }
  // Add Update and Delete
  return (
    <Fragment>
      <ChatAppStyles>
        {mode === 'update-mode'
          ? <div><input placeholder='Session name'></input><button onClick={() => handleUpdateSubmit()}>Submit</button></div> : <h4>{chatSessionName}</h4>}
        {owner === user._id
          ? <div>
            <AiOutlineEdit onClick={() => handleEdit(chatSessionId)} />
            <AiOutlineDelete size='1.5rem' onClick={() => handleClose(chatSessionId)} />
          </div>
          : ''}
        <BiExit size='1.5rem' />
      </ChatAppStyles>
      <ChatMessages messages={messages} user={user} />
      <ChatInputField chatSessionId={chatSessionId} user={user} getMessages={getMessages} socket={socket} chatSessionName={chatSessionName} />
    </Fragment>
  )
}

export default withRouter(ChatApp)
