import type { Inventory } from "$lib/models/inventory";
import { Message } from "$lib/message";
import { Status } from "$lib/status";

let inventoryDB: Map<string, Inventory> = new Map();

function addInventory(item: Inventory): Message {
    if (inventoryDB.has(item._id)) {
        return new Message(Status.FAILED, "ID already exists.");
    } else {
        inventoryDB.set(item._id, item);
        return new Message(Status.SUCCESS, "Inventory Item Inserted");
    }
}

function getAllItems(): Inventory[] {
    return Array.from(inventoryDB.values());
}

function updateInventory(item: Inventory): Message {
    if (inventoryDB.has(item._id)) {
        inventoryDB.set(item._id, item);
        return new Message(Status.SUCCESS, "Inventory Item Updated");
    } else {
        return new Message(Status.FAILED, "ID doesn't exists.");
    }
}

function deleteInventoryById(id: string): Message {
    if (inventoryDB.delete(id)) {
        return new Message(Status.SUCCESS, "Inventory Item Deleted");
    } else {
        return new Message(Status.FAILED, "No Such ID in InventoryDB");
    }
}
