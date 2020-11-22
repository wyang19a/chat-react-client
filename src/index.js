import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import io from 'socket.io-client'
import apiUrl from './apiConfig'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'

const socket = io.connect(apiUrl)

const appJsx = (
  <HashRouter>
    <App socket={socket} />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
