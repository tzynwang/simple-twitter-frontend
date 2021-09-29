import { io } from 'socket.io-client'

export default function socketConnect (user) {
  const { id, name, avatar, account } = user
  const socket = io('https://twitter202109.herokuapp.com/', {
    query: {
      id,
      name,
      avatar,
      account
    }
  })

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}
