/**
 * @file Implements APIs for Inventory related data access object methods
 */
import type { Inventory } from '$lib/models/inventory';
import { Message } from '$lib/message';
import { Status } from '$lib/status';
import * as DeletionLogService from '$lib/dao/deletionLogDao';

/**
 * Represents a DB holding all the inventory items.
 */
const inventoryDB: Map<string, Inventory> = new Map();

/**
 * Adds a new {@link Inventory} Item to the DB.
 *
 * @param item {Inventory} - the {@link Inventory} Item to be inserted
 * @return {Message} - the status of the insertion operation.
 */
export function addInventory(item: Inventory): Message {
	if (inventoryDB.has(item._id)) {
		return new Message(Status.FAILED, 'ID already exists.');
	} else {
		inventoryDB.set(item._id, item);
		return new Message(Status.SUCCESS, 'Inventory Item Inserted');
	}
}

/**
 * Returns all the {@link Inventory} Items from the database.
 *
 * @return {Inventory[]>} - array containing all Inventory Items in the database.
 */
export function getAllItems(): Inventory[] {
	return Array.from(inventoryDB.values());
}

/**
 * Returns if a {@link Inventory} Item exists with  given ID.
 *
 * @param id {string} - the ID of the Inventory Item
 * @return {boolean} - if an Inventory Item with the given ID exists on the database.
 */
export function hasId(id: string): boolean {
	return inventoryDB.has(id);
}

/**
 * Returns an {@link Inventory} Item given ID, if it exists else returns a message with empty payload,
 * describing why the API call failed.
 *
 * @param id {string} - the ID of the Inventory Item
 * @return {Message} - if an Inventory Item with the given ID exists on the database, contains he target
 * Item as the payload, else has an empty payload with the message describing why the API failed.
 */
export function getItemById(id: string): Message {
	if (inventoryDB.has(id)) {
		return new Message(Status.SUCCESS, 'Fetched sucessfully', inventoryDB.get(id));
	} else {
		return new Message(Status.FAILED, 'No Item with provided ID');
	}
}

/**
 * Updates an exiting Inventory item with the passed in {@link Inventory} object.
 *
 * @param item {Inventory} - the Inventory item to be updated. DB entry with the passed in ID is overwritten.
 * @return {Message} - status of the update operation
 */
export function updateInventory(item: Inventory): Message {
	if (inventoryDB.has(item._id)) {
		inventoryDB.set(item._id, item);
		return new Message(Status.SUCCESS, 'Inventory Item Updated');
	} else {
		return new Message(Status.FAILED, "ID doesn't exists.");
	}
}

/**
 * Deletes the exiting {@link Inventory} item with the passed in id, and logs it so it can be retrieved later.
 *
 * @param id {string} - the ID of the Inventory Item to be deleted.
 * @param deletion_comment {string} - the comment given with the delete operation.
 * @return {Message} - status of the delete operation
 */
export function deleteInventoryById(id: string, deletion_comment: string): Message {
	if (inventoryDB.has(id)) {
		DeletionLogService.logDeletion(inventoryDB.get(id), deletion_comment);
		inventoryDB.delete(id);
		return new Message(Status.SUCCESS, 'Inventory Item Logged and Deleted');
	} else {
		return new Message(Status.FAILED, 'No Such ID in InventoryDB');
	}
}
