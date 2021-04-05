import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Token } from "../types/Token";

/**
 * Reads JWT cookie, verifies it, and save it's content into req.token
 */
export async function authenticateJWT(req: Request, res: Response, next: Function) {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.redirect('/')
    }
    req.token = await verify(token, process.env.JWT_SECRET as string) as Token;
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};