import { timingSafeEqual } from "node:crypto";
import { generate, uuid } from "short-uuid";
import { Column, Entity, getRepository, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ThreadDTO } from "../dto/ThreadDTO";
import { Account } from "./Account";
import { Message } from "./Message";
const randomWordFR = require('random-word-fr');

@Entity()
@Index(["uuid"])
@Index(["channel"])
export class Thread {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  uuid: string

  @ManyToOne(() => Account, account => account.threads)
  author: Account

  @OneToMany(() => Message, message => message.thread)
  messages: Message[]

  @Column()
  nicknames: string // serialized from JS object { number: string... }

  @Column()
  channel: string

  static async construct(author: Account, firstMessage: string, channel: string): Promise<Thread> {
    let t = new Thread()
    t.uuid = generate()
    t.author = author    
    t.channel = channel
    t.nicknames = "{}"
    t.messages = []
    await t.addMessage(author, firstMessage)
    const threadRepository = getRepository(Thread)
    return threadRepository.save(t)
  }

  async addMessage(author: Account, message: string): Promise<Message> {
    const newMsg = await Message.construct(author, this.getNickame(author), message)
    this.messages.push(newMsg)
    return newMsg
  }

  getNickame(author: Account): string {
    let obj = JSON.parse(this.nicknames)
    let nick = obj[author.id]
    if (nick) return nick
    nick = randomWordFR()
    obj[author.id] = nick
    this.nicknames = JSON.stringify(obj)
    // const threadRepository = getRepository(Thread)
    // threadRepository.save(this)
    return nick
  }

  getSummary(): ThreadDTO {
    return {
      uuid: this.uuid,
      channel: this.channel,
      messages: [ this.messages[0].toDTO() ]
    }
  }

  toDTO(): ThreadDTO {
    return {
      uuid: this.uuid,
      channel: this.channel,
      messages: this.messages.map(m => m.toDTO())
    }
  }

}