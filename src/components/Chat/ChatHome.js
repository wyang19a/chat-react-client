import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getChatSessions } from '../../api/chatsession'

const ChatGridStyle = styled.div`
  padding-top: 5rem;
`

function ChatHome ({ user, setChatSessionId, setChatSessionName }) {
  // const [count, setCount] = useState(0)
  const [chatSessions, setChatSessions] = useState([])

  useEffect(() => {
    onGetChatSessions()
    // console.log(socket)
  }, [])

  const onGetChatSessions = () => {
    getChatSessions(user)
      .then(res => setChatSessions(res.data.chatsessions))
      .then()
      .catch()
  }
  // const onCreateNewChat = () = {
  //   createChatSession(user, )
  // }
  const handleSessionClick = (id, name) => {
    setChatSessionId(id)
    setChatSessionName(name)
  }
  return (
    <ChatGridStyle>
      <Link to="chatlobby/create-new-chat">New Chat Session</Link>
      <h1>Chatting app</h1>
      {chatSessions && chatSessions.map(session => (
        <div key={session._id}>
          {/* <p>{session.name}</p> */}
          <Link to="chatlobby/chat" onClick={() => handleSessionClick(session._id, session.name)}>{session.name}</Link>
        </div>
      ))}
      {/* Friend list */}
    </ChatGridStyle>
  )
}

export default withRouter(ChatHome)
