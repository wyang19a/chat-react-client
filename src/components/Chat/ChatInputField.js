import React, { Fragment, useState } from 'react'
import { createMessage } from '../../api/message'

export default function ChatInputField ({ chatSessionId, user }) {
  const [message, setMessage] = useState('')

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }
  const handlethis = () => {
    createMessage(message, chatSessionId, user)
      .then(console.log('success!'))
  }
  return (
    <Fragment>
      <textarea onChange={handleMessage} placeholder="Your message here" />
      <button onClick={handlethis}>Submit</button>
      {/* TODO: Change it to form, and then submit */}
    </Fragment>
  )
}
