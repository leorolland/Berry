import { Request, Response, Router } from "express";
import { Account } from "./entity/Account";
import { saveTokenInCookies } from "./login/saveTokenInCookies";
import { authenticateJWT } from "./login/authenticateJWT";
import {getRepository} from "typeorm";

const express = require('express')

let router = Router()


router.use(express.static('public'));

router.use('/app', authenticateJWT, express.static('dist_client'))

router.get('/createAccount', (req: Request, res: Response) => {
  const accountRepository = getRepository(Account);
  let newAcc = new Account()
  accountRepository.save(newAcc)
  saveTokenInCookies(res, newAcc.generateToken())
  res.redirect('/app')
  console.debug(`Created account id '${newAcc.id}' with passphrase '${newAcc.passphrase}'`)
})

module.exports = router