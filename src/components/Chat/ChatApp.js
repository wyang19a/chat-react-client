import React, { Fragment, useEffect, useState } from 'react'
import { getChatSession, deleteChatSession } from '../../api/chatsession'
import ChatMessages from './ChatMessages'
import ChatInputField from './ChatInputField'
import { AiOutlineDelete } from 'react-icons/ai'
import { withRouter } from 'react-router-dom'

function ChatApp ({ chatSessionId, chatSessionName, user, history }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = () => {
    getChatSession(chatSessionId, user)
      .then(res => setMessages(res.data.chatsession.messages))
      .then()
      .catch()
  }

  const handleClose = (id) => {
    deleteChatSession(id, user)
      .then(console.log('delete success!'))
      .then(() => history.push('/chatlobby'))
  }
  // Add Update and Delete
  return (
    <Fragment>
      <div>
        <h4>{chatSessionName}</h4>
        {/* <AiOutlineEdit onClick={handleEdit} /> */}
        <AiOutlineDelete onClick={() => handleClose(chatSessionId)} />
      </div>
      <ChatMessages messages={messages} user={user} />
      <ChatInputField chatSessionId={chatSessionId} user={user} />
    </Fragment>
  )
}

export default withRouter(ChatApp)
