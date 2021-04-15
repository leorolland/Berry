import { MessageDTO } from "./MessageDTO"

export type ThreadDTO = {
    id: string,
    messages: MessageDTO[]
}