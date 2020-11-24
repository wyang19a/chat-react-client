import React, { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import { createChatSession } from '../../api/chatsession'
import messages from '../AutoDismissAlert/messages'

function CreateChat ({ msgAlert, history, user, socket }) {
  const [formData, setFormData] = useState({ name: '' })

  const onCreateChatSession = e => {
    e.preventDefault()

    createChatSession(formData, user)
      .then(() => msgAlert({
        heading: 'New Chat Session Created',
        message: messages.createChatSuccess,
        variant: 'success'
      }))
      .then(() => socket.emit('new chatsession created'))
      .then(() => history.push('/chatlobby'))
      .catch()
  }
  const handleChange = e => {
    setFormData({
      [e.target.name]: e.target.value
    })
  }

  return (
    <Fragment>
      <h1>New Chat</h1>
      <Form onSubmit={onCreateChatSession}>
        <Form.Group controlId="name">
          <Form.Label>Session name</Form.Label>
          <Form.Control
            required
            name="name"
            value={formData.name}
            type="text"
            placeholder="Session name"
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

export default withRouter(CreateChat)
