import { Token } from "../types/Token";

export function getToken(tokenList: Map<string, Token>, socket: any) {
    const token = tokenList.get(socket.id)
    if (!token) { 
      socket.emit('notAuthenticated')
      return null
    }
    return token
}