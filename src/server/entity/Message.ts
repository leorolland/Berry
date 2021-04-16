import { Column, Entity, getRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { MessageDTO } from "../dto/MessageDTO"
import { Account } from "./Account"
import { Thread } from "./Thread"

@Entity()
export class Message {

  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Account, account => account.messages)
  author: Account

  @ManyToOne(() => Thread, thread => thread.messages)
  thread: Thread

  @Column()
  nickname: string

  @Column()
  date: number

  @Column()
  message: string

  static construct(author: Account, nickname: string, message: string): Promise<Message> {
    let msg = new Message()
    msg.author = author
    msg.nickname = nickname
    msg.date = new Date().getTime()
    msg.message = message
    const messageRepository = getRepository(Message)
    return messageRepository.save(msg)
  }

  toDTO(): MessageDTO {
    return {
      date: this.date,
      message: this.message,
      nickname: this.nickname
    }
  }

}