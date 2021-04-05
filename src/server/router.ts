import { Request, Response, Router } from "express";
import { Account } from "./types/Account";
import { saveTokenInCookies } from "./login/saveTokenInCookies";
import { authenticateJWT } from "./login/authenticateJWT";
import { Thread } from "./types/Thread";
import { Db } from "./types/Db";
const express = require('express')

let router = Router()


router.use(express.static('public'));

router.use('/app', authenticateJWT, express.static('dist_client'))

router.get('/createAccount', (req: Request, res: Response) => {
  let db: Db = req.app.get('db')
  let newAcc = new Account(db.accounts.size)
  db.accounts.set(newAcc.id, newAcc)
  saveTokenInCookies(res, newAcc.generateToken())
  res.redirect('/app')
  console.debug(`Created account id '${newAcc.id}' with passphrase '${newAcc.passphrase}'`)
})

router.post('/createThread', authenticateJWT, (req: Request, res: Response) => {
  let db: Db = req.app.get('db')
  let author = db.accounts.get(req.token.id) as Account
  let thread = new Thread(author, req.body as string)
  db.threads.set(thread.id, thread)
  res.send(thread.id)
  console.debug(`Created thread id '${thread.id}' by '${author.id}' with message '${req.body}'`)
})



module.exports = router