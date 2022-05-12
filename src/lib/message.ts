import type { Status } from "./status";

export class Message {
    status: Status;
    message: string;

    constructor(status: Status, message: string) {
       this.status = status;
       this.message = message;
   }
}