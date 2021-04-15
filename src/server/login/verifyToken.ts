import { verify } from "jsonwebtoken";
import { Token } from "../types/Token";

export function verifyToken(token: any): Token {
    return verify(token, process.env.JWT_SECRET as string) as Token;
}