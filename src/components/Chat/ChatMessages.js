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

export default function ChatMessages ({ messages, user }) {
  // console.log(messages)
  return (
    <Fragment>
      {messages && messages.map(message => (
        <MessageStyle key={message._id}>
          {user._id === message.owner
            ? <UserMessageStyle>
              <span className='message-text'>{message.text}</span><span className='message-user-name'>{message.nickName}</span>
            </UserMessageStyle>
            : <OthersMessagesStyle>
              <span className='message-user-name'>{message.nickName}</span><span className='message-text'>{message.text}</span>
            </OthersMessagesStyle>
          }
        </MessageStyle>
      ))}
    </Fragment>
  )
}
