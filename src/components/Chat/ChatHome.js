import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { getChatSessions } from '../../api/chatsession'

const ChatGridStyle = styled.div`
  padding-top: 5rem;
`
const ChatSessionInfoStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
`

function ChatHome ({ user, setChatSessionId, setChatSessionName, socket }) {
  const [chatSessions, setChatSessions] = useState([])

  useEffect(() => {
    onGetChatSessions()
    // console.log(socket)
  }, [])
  socket.on('update session list for deleted', () => {
    onGetChatSessions()
  })
  socket.on('update session list for created', () => {
    onGetChatSessions()
  })
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
    // subscribe to `name` by sending 'join chatroom' to backend
    socket.emit('join chatsession', name)
  }
  return (
    <ChatGridStyle>
      <Link to="chatlobby/create-new-chat">New Chat Session</Link>
      <h1>Chatting app</h1>
      {chatSessions && chatSessions.map(session => (
        <ChatSessionInfoStyles key={session._id}>
          {/* <p>{session.name}</p> */}
          <Link to="chatlobby/chat" onClick={() => handleSessionClick(session._id, session.name)}>{session.name}</Link>
          <div>owner: {session.owner.nickName}</div>
        </ChatSessionInfoStyles>
      ))}
      {/* Friend list */}
    </ChatGridStyle>
  )
}

export default withRouter(ChatHome)
