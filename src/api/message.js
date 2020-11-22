import apiUrl from '../apiConfig'
import axios from 'axios'

// INDEX
export const getMessages = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sessions',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

// CREATE
export const createMessage = (text, sessionId, user) => {
  return axios({
    url: apiUrl + '/messages',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      message: {
        text: text,
        sessionId: sessionId,
        nickName: user.nickName
      }
    }
  })
}
