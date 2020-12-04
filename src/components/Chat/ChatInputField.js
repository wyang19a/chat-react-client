import React, { Fragment, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { createMessage } from '../../api/message'

export default function ChatInputField ({ chatSessionId, user, socket, getMessages, chatSessionName }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // listen for 'new chat message', get Messages.
    socket.on('new chat message', () => {
      getMessages()
    })
    // socket.on('join success', () => {
    //   createMessage(`${user.nickName} joined`, chatSessionId, user)
    //   getMessages()
    // })
  }, [])
  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    createMessage(message, chatSessionId, 'user-input', user)
      .then(setMessage(''))
      .then(() => {
        // send 'send chat message' to backend, then get Messages.
        socket.emit('send chat message', chatSessionName)
        getMessages()
      })
  }

  return (
    <Fragment>
      <Form onSubmit={onMessageSubmit}>
        <Form.Group controlId="message">
          <Form.Control
            required
            name="message"
            value={message}
            type="textarea"
            placeholder="Your message here"
            autoComplete="off"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}
