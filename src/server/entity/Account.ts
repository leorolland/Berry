import { sign } from "jsonwebtoken";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";
import { Token } from "../types/Token";
import { Message } from "./Message";
const randomWordFR = require('random-word-fr');

@Entity()
export class Account {
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  passphrase: string

  @Column()
  lastActivity: number

  @OneToMany(() => Thread, thread => thread.author)
  threads!: Thread[]

  @OneToMany(() => Message, message => message.author)
  messages!: Message[]

  constructor() {
    this.passphrase = this.generatePassphrase()
    this.lastActivity = new Date().getTime()
  }

  generatePassphrase(): string {
    let p = ""
    for (let i = 0; i < 2; i++) {
      p = p += randomWordFR() + " "
    }
    return p.trim()
  }

  generateToken(): string {
    const token: Token = { id: this.id }
    return sign(token, process.env.JWT_SECRET as string, { expiresIn: '1h', algorithm: 'HS256' })
  }

}