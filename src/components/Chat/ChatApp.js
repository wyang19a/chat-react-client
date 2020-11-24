import React, { Fragment, useEffect, useState } from 'react'
import { getChatSession, deleteChatSession, updateChatSession } from '../../api/chatsession'
import ChatMessages from './ChatMessages'
import ChatInputField from './ChatInputField'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Form } from 'react-bootstrap'

const ChatAppStyles = styled.div`
    display: flex;
    flex-direction: row;
`

function ChatApp ({ chatSessionId, chatSessionName, user, history, socket, setChatSessionName }) {
  const [updateMode, setUpdateMode] = useState(false)
  const [messages, setMessages] = useState([])
  const [owner, setOwner] = useState('')
  const [chatsession, setChatsession] = useState({ name: '' })

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

  const handleDelete = (id) => {
    deleteChatSession(id, user)
      .then(() => history.push('/chatlobby'))
      .then(socket.emit('chatsession deleted'))
  }
  const handleEdit = () => {
    // setChatsession(chatsession.name)
    setUpdateMode(!updateMode)
  }
  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    console.log(chatsession)
    updateChatSession(chatsession, chatSessionId, user)
      .then(() => setChatSessionName(chatsession.name))
      .then(() => setUpdateMode(false))
      .catch()
  }
  const handleChange = e => {
    setChatsession({
      [e.target.name]: e.target.value
    })
  }
  // Add Update and Delete
  return (
    <Fragment>
      <ChatAppStyles>
        {updateMode
          ? <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                required
                name="name"
                value={chatsession.name}
                type="text"
                placeholder="New session name"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          // <form onSubmit={handleUpdateSubmit}>
          //   <label>
          //     Name:
          //     <input type='text' name='name' onChange={e => handleChange(e)} defaultValue={chatsession.name} />
          //   </label>
          //   <button type='submit' />
          // </form>
          : <h4>{chatSessionName}</h4>}
        {owner === user._id
          ? <div>
            <AiOutlineEdit onClick={() => handleEdit(chatSessionId)} />
            <AiOutlineDelete size='1.5rem' onClick={() => handleDelete(chatSessionId)} />
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
