import { Request, Response, Router } from "express";
import { Account } from "./entity/Account";
import { saveTokenInCookies } from "./login/saveTokenInCookies";
import { authenticateJWT } from "./login/authenticateJWT";
import {getRepository} from "typeorm";
import { verifyToken } from "./login/verifyToken";

const express = require('express')

let router = Router()


router.use(express.static('public'));

router.use('/app', authenticateJWT, express.static('dist_client'))

router.get('/createAccount', async (req: Request, res: Response) => {
  const accountRepository = getRepository(Account);
  let newAcc = new Account()
  newAcc = await accountRepository.save(newAcc)
  const token = newAcc.generateToken()
  saveTokenInCookies(res, token)
  res.redirect('/app')
})

module.exports = router