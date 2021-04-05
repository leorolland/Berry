import { Account } from "./Account";
import { Thread } from "./Thread";

export class Db {

  accounts: Map<number, Account> = new Map()

  threads: Map<string, Thread> = new Map()

}