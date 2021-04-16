import { Server } from "socket.io";
import { CreateThreadDTO } from "./dto/CreateThreadDTO";
import { getToken } from "./login/getToken";
import { verifyToken } from "./login/verifyToken";
import { Thread } from "./entity/Thread";
import { Token } from "./types/Token";
import { getRepository } from "typeorm";
import { Account } from "./entity/Account";

export function io(httpServer: any) {
  const tokens: Map<string, Token> = new Map()
  const io = new Server(httpServer)
  const threadRepository = getRepository(Thread);
  const accountRepository = getRepository(Account)

  io.on('connection', socket => {

    socket.on('authenticate', token => { console.log(token); tokens.set(socket.id, verifyToken(token))})

    socket.on('joinRoom', room => socket.join(room))

    socket.on('createThread', async (thread: CreateThreadDTO) => {
      const token = getToken(tokens, socket)
      if (!token) return
      const account = await accountRepository.findOne(token.id)
      if (!account) throw Error(`Account id ${token.id} not found in db`)
      let t = await Thread.construct(account, thread.message, thread.channel)
      //let updatedThread = await threadRepository.findOne(t.id, { relations: ["messages"] })
      //if (!updatedThread) throw Error("Thread failed to create")
      //io.to(thread.channel).emit('newThread', updatedThread.getSummary())
    })

    socket.on('getRecentThreads', async channel => {
      const token = getToken(tokens, socket)
      if (!token) return
      let t = await threadRepository.find({ 
        where: { 'channel': channel }, 
        relations: ['messages'] 
      })
      if (!t) return
      console.debug(t)
      return socket.emit('updateThreads', {channel: channel, threads: t.map(t => t.getSummary())})
    })

    socket.on('getFullThread', async threadUuid => {
      const token = getToken(tokens, socket)
      if (!token) return
      let t = await threadRepository.findOne({ uuid: threadUuid }, { relations: ["user"] })
      if (!t) return
      return t.toDTO()
    })

  })

  return io
}
