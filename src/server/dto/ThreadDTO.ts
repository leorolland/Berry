import { MessageDTO } from "./MessageDTO"

export type ThreadDTO = {
    uuid: string,
    messages: MessageDTO[]
}