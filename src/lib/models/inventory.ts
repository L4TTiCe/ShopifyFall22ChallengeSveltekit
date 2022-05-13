/**
 * Represents a Item in the Inventory.
 * @public
 */
export interface Inventory {
	_id: string;
	name?: string;
	description?: string;
	quantity?: number;
	created_on?: string;
}
