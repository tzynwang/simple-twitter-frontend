import { io } from 'socket.io-client'

export default function socketConnect (user) {
  const { id, name, avatar, account } = user
  const socket = io('http://4f35-2401-e180-8d20-357c-f84a-1c5-44dd-974.ngrok.io', {
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
