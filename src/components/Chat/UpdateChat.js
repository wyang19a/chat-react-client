import React, { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'
import { updateChatSession } from '../../api/chatsession'
import messages from '../AutoDismissAlert/messages'

function UpdateChat ({ msgAlert, history, user, chatSessionId }) {
  const [formData, setFormData] = useState({ name: '' })

  const onUpdateChatSession = e => {
    e.preventDefault()

    updateChatSession(formData, chatSessionId, user)
      .then(() => msgAlert({
        heading: 'Chat Edit Successful',
        message: messages.editChatSuccess,
        variant: 'success'
      }))
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
      <h1>Update Chat Name</h1>
      <Form onSubmit={onUpdateChatSession}>
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

export default withRouter(UpdateChat)
