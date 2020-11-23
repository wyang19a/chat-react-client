import React, { Fragment, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { createMessage } from '../../api/message'

export default function ChatInputField ({ chatSessionId, user }) {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    createMessage(message, chatSessionId, user)
      .then(setMessage(''))
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
