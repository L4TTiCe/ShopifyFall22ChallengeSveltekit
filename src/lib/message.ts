import type { Inventory } from './models/inventory';
import type { Status } from './status';

export class Message {
	status: Status;
	message: string;
	item?: Inventory;

	constructor(status: Status, message: string, item?: Inventory) {
		this.status = status;
		this.message = message;
		this.item = item;
	}
}
