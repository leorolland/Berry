import { Secret, sign } from "jsonwebtoken";
import { Token } from "./Token";
const randomWordFR = require('random-word-fr');

export class Account {
  
  id: number
  passphrase: string
  lastActivity: number

  constructor(id: number) {
    this.id = id
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