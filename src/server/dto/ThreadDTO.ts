import { MessageDTO } from "./MessageDTO"

export type ThreadDTO = {
    uuid: string,
    channel: string
    messages: MessageDTO[]
}