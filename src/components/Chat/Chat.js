import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getChatSessions } from '../../api/chatsession'

const ChatGridStyle = styled.div`
padding-top: 5rem;`

function ChatMain ({ user }) {
  // const [count, setCount] = useState(0)
  const [chatSessions, setChatSessions] = useState([])

  useEffect(() => {
    onGetChatSessions()
  }, [])

  const onGetChatSessions = () => {
    getChatSessions(user)
      .then(res => setChatSessions(res.data.chatsessions))
      .catch()
  }
  // const onCreateNewChat = () = {
  //   createChatSession(user, )
  // }
  return (
    <ChatGridStyle>
      <Link to="test/create-new-chat">New Chat Session</Link>
      <h1>Chatting app</h1>
      {chatSessions && chatSessions.map(session => (
        <div key={session._id}>
          <p>{session.name}</p>
        </div>
      ))}
      {/* Friend list */}
    </ChatGridStyle>
  )
}

export default withRouter(ChatMain)
