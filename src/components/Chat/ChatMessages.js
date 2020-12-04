import React, { Fragment } from 'react'
import styled from 'styled-components'

const MessageStyle = styled.div`
  margin-top: 0.5rem;
  .message-text {
    border: 1px solid black;
    border-radius: 10px;
    padding: 5px;
  }
  box-sizing: border-box;
`

const UserMessageStyle = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .message-text {
  background-color: lightblue;
  }
`
const OthersMessagesStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  .message-text {
  background-color: lightgrey;
  }
`

function ConditionalMessage ({ user, message }) {
  if (user._id === message.owner && message.messageType === 'user-input') {
    return (
      <UserMessageStyle>
        <span className='message-text'>{message.text}</span><span className='message-user-name'>{message.nickName}</span>
      </UserMessageStyle>
    )
  } else if (user._id === message.owner && message.messageType === 'user-input') {
    return (
      <OthersMessagesStyle>
        <span className='message-user-name'>{message.nickName}</span><span className='message-text'>{message.text}</span>
      </OthersMessagesStyle>
    )
  } else if (message.messageType === 'info') {
    return (
      <p>{message.text}</p>
    )
  } else {
    return null
  }
}

export default function ChatMessages ({ messages, user }) {
  return (
    <Fragment>
      {messages && messages.map(message => (
        <MessageStyle key={message._id}>
          <ConditionalMessage user={user} message={message} />
        </MessageStyle>
      ))}
    </Fragment>
  )
}
