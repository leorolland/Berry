import { Request, Response } from "express";
import { Token } from "../types/Token";
import { verifyToken } from "./verifyToken";

/**
 * Reads JWT cookie, verifies it, and save it's content into req.token
 */
export async function authenticateJWT(req: Request, res: Response, next: Function) {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return res.redirect('/')
    }
    req.token = verifyToken(token)
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};