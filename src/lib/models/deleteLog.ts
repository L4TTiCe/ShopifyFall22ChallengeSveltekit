export interface DeletedInventory {
    _id: string;
	name?: string;
    description?: string;
    quantity?: number;
    created_on?: string;

    deleted_on: Date;
    deletion_comment?: string;
}
