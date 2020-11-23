import React, { Fragment, useState } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../Auth/SignUp/SignUp'
import SignIn from '../Auth/SignIn/SignIn'
import SignOut from '../Auth/SignOut/SignOut'
import ChangePassword from '../Auth/ChangePassword/ChangePassword'
import ChatHome from '../Chat/ChatHome'
import CreateChat from '../Chat/CreateChat'
import ChatApp from '../Chat/ChatApp'

export default function App ({ socket }) {
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [chatSessionId, setChatSessionId] = useState(null)
  const [chatSessionName, setChatSessionName] = useState('')

  const clearUser = () => setUser(null)

  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts(() => [...msgAlerts, { heading, message, variant }])
  }

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
        />
      ))}
      <main className="container">
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={msgAlert} setUser={setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={msgAlert} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/chatlobby' render={() => (
          <ChatHome msgAlert={msgAlert} user={user} socket={socket} setChatSessionId={setChatSessionId} setChatSessionName={setChatSessionName} />
        )} />
        <AuthenticatedRoute user={user} path='/chatlobby/create-new-chat' render={() => (
          <CreateChat msgAlert={msgAlert} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/chatlobby/chat' render={() => (
          <ChatApp msgAlert={msgAlert} user={user} chatSessionId={chatSessionId} chatSessionName={chatSessionName} />
        )} />
      </main>
    </Fragment>
  )
}
