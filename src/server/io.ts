import { Server } from "socket.io";

export function io(httpServer: any, games: any) {
  const io = new Server(httpServer)

  io.on('connection', socket => {

    socket.on('joinRoom', room => {
      socket.join(room)
    })

    
  })

  return io
}