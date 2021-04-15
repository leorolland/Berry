import { Response } from "express";

export function saveTokenInCookies(res: Response, token: string) {
  res.cookie('token', token, {
    expires: new Date(Date.now() + 86400 * 1000 * 90),
    secure: false, // set to true if your using https
    httpOnly: false,
  });
}