import { generate } from "short-uuid";
import { ThreadDTO } from "../dto/ThreadDTO";
import { Account } from "./Account";
import { Message } from "./Message";
const randomWordFR = require('random-word-fr');

export class Thread {
  
  id: string
  authorId: number
  messages: Message[]
  nicknames: Map<number, string>

  constructor(author: Account, firstMessage: string) {
    this.id = generate()
    this.authorId = author.id
    this.nicknames = new Map()
    let nickname = randomWordFR()
    this.nicknames.set(author.id, nickname)
    this.messages = [ new Message(author, nickname, firstMessage) ]
    console.debug(`Created thread from ${author.id} : ${firstMessage}`)
  }

  getSummary(): ThreadDTO {
    return {
      id: this.id,
      messages: [ this.messages[0].toDTO() ]
    }
  }

}