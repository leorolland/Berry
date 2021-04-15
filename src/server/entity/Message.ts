import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { MessageDTO } from "../dto/MessageDTO"
import { Account } from "./Account"
import { Thread } from "./Thread"

@Entity()
export class Message {

  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Account, account => account.messages)
  author: Account

  @OneToMany(() => Thread, thread => thread.messages)
  thread!: Thread

  @Column()
  nickname: string

  @Column()
  date: number

  @Column()
  message: string

  constructor(author: Account, nickname: string, msg: string) {
    this.author = author
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