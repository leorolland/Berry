import { Server } from "socket.io";
import { CreateThreadDTO } from "./dto/CreateThreadDTO";
import { getToken } from "./login/getToken";
import { verifyToken } from "./login/verifyToken";
import { Db } from "./types/Db";
import { Thread } from "./types/Thread";
import { Token } from "./types/Token";

export function io(httpServer: any, db: Db) {
  const tokens: Map<string, Token> = new Map()
  const io = new Server(httpServer)

  io.on('connection', socket => {

    socket.on('authenticate', token => { console.log(token); tokens.set(socket.id, verifyToken(token))})

    socket.on('joinRoom', room => socket.join(room))

    socket.on('createThread', (thread: CreateThreadDTO) => {
      const token = getToken(tokens, socket)
      if (!token) return
      const account = db.accounts.get(token.id)
      if (!account) throw Error(`Account id ${token.id} not found in db`)
      const t = new Thread(account, thread.message)
      io.to(thread.room).emit('newThread', t.getSummary())
      db.threads.set(t.id, t)
    })

  })

  return io
}

