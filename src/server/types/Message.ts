import { MessageDTO } from "../dto/MessageDTO"
import { Account } from "./Account"

export class Message {

  authorId: number
  nickname: string
  date: number
  message: string

  constructor(author: Account, nickname: string, msg: string) {
    this.authorId = author.id
    this.nickname = nickname
    this.date = new Date().getTime()
    this.message = msg
  }

  toDTO(): MessageDTO {
    return {
      date: this.date,
      message: this.message,
      nickname: this.nickname
    }
  }

}