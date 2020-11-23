import React, { Fragment, useEffect, useState } from 'react'
import { getChatSession } from '../../api/chatsession'
import ChatMessages from './ChatMessages'
import ChatInputField from './ChatInputField'

export default function ChatApp ({ chatSessionId, chatSessionName, user }) {
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

  return (
    <Fragment>
      <h4>{chatSessionName}</h4>
      <ChatMessages messages={messages} user={user} />
      <ChatInputField chatSessionId={chatSessionId} user={user} />
    </Fragment>
  )
}
