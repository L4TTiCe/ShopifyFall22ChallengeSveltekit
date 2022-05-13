import type { Inventory } from '$lib/models/inventory';
import type { DeletedInventory } from '$lib/models/deleteLog';
import { Message } from '$lib/message';
import { Status } from '$lib/status';
import * as InventoryService from '$lib/dao/inventoryDao';

const deletionLogDB: Map<string, DeletedInventory> = new Map();

export function logDeletion(item: Inventory | undefined, deletion_comment: string): Message {
	if (item) {
		const LogEntry: DeletedInventory = {
			...item,
			deleted_on: new Date(),
			deletion_comment: deletion_comment
		};

		if (deletionLogDB.has(item._id)) {
			return new Message(Status.FAILED, 'ID already exists.');
		} else {
			deletionLogDB.set(item._id, LogEntry);
			return new Message(Status.SUCCESS, 'Log appended');
		}
	}
	return new Message(Status.FAILED, 'No item received.');
}

export function getAllEntries(): DeletedInventory[] {
	return Array.from(deletionLogDB.values());
}

export function revertDeletionById(id: string): Message {
	if (deletionLogDB.has(id)) {
		if (InventoryService.hasId(id)) {
			return new Message(
				Status.FAILED,
				'ID exists in both deletion Log and Inventory. Contact Support.'
			);
		} else {
			const itemToRestore = deletionLogDB.get(id);
			if (itemToRestore) {
				InventoryService.addInventory(itemToRestore);
				purgeLogById(id);
				return new Message(Status.SUCCESS, 'ID restored');
			}
			return new Message(Status.FAILED, 'Error Restoring ID. Contact Support.');
		}
	} else {
		return new Message(Status.FAILED, 'ID does not exists.');
	}
}

export function purgeLogById(id: string): Message {
	if (deletionLogDB.delete(id)) {
		return new Message(Status.SUCCESS, 'Log Entry Deleted');
	} else {
		return new Message(Status.FAILED, 'No Such ID in deletionLogDB');
	}
}
