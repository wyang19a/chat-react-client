import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createChatSession = (chatsession, user) => {
  return axios({
    url: apiUrl + '/sessions',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      chatsession: {
        name: chatsession.name
      }
    }
  })
}

// SHOW
export const getChatSession = (chatSessionId, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sessions/' + chatSessionId,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

// INDEX
export const getChatSessions = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/sessions',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

// UPDATE
export const updateChatSession = (chatsession, chatSessionId, user) => {
  return axios({
    url: apiUrl + '/sessions/' + chatSessionId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      chatroom: {
        name: chatsession.name
      }
    }
  })
}

// DELETE
export const deleteChatSession = (chatSessionId, user) => {
  return axios({
    url: apiUrl + '/sessions/' + chatSessionId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
