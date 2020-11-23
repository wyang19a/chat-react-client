import React, { Fragment } from 'react'

export default function ChatMessages ({ messages, user }) {
  console.log(messages)
  return (
    <Fragment>
      {messages && messages.map(message => (
        <p key={message._id}>{message.text}</p>
      ))}
    </Fragment>
  )
}
