import { generate, uuid } from "short-uuid";
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ThreadDTO } from "../dto/ThreadDTO";
import { Account } from "./Account";
import { Message } from "./Message";
const randomWordFR = require('random-word-fr');

@Entity()
@Index(["uuid"], { unique: true })
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

  static construct(author: Account, firstMessage: string): Thread {
    let t = new Thread()
    t.uuid = generate()
    t.author = author
    let nickname = randomWordFR()
    const authorId = author.id
    t.nicknames = JSON.stringify( { authorId : nickname } )
    t.messages = [ new Message(author, nickname, firstMessage) ]
    console.debug(`Created thread from ${author.id} : ${firstMessage}`)
    return t
  }

  getSummary(): ThreadDTO {
    return {
      uuid: this.uuid,
      messages: [ this.messages[0].toDTO() ]
    }
  }

}