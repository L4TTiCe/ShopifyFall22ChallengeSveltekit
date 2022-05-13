<script lang="ts">
	import { page } from '$app/stores';
	import { getItemById, updateInventory } from '$lib/dao/inventoryDao';
	import type { Inventory } from '$lib/models/inventory';
	import type { Message } from '$lib/message';
	import { Status } from '$lib/status';
	import InventoryForm from '$lib/components/InventoryForm.svelte';
	import { goto } from '$app/navigation';

	export const inventoryItemMessage: Message = getItemById($page.params.id);

	let id = '';
	let name = '';
	let description = '';

	let quantity = '';
	let created_on = new Date().toISOString().slice(0, 16);

	let status_message = '';

	if (inventoryItemMessage.item) {
		id = inventoryItemMessage.item._id;
		if (inventoryItemMessage.item.name) {
			name = inventoryItemMessage.item.name;
		}
		if (inventoryItemMessage.item.description) {
			description = inventoryItemMessage.item.description;
		}
		if (inventoryItemMessage.item.quantity) {
			quantity = inventoryItemMessage.item.quantity.toString();
		}
		if (inventoryItemMessage.item.created_on) {
			created_on = inventoryItemMessage.item.created_on;
		}
	}

	function validateInventoryItem(item: Inventory): boolean {
		if (item.name == '') {
			return false;
		} else {
			return true;
		}
	}

	function handleSubmit() {
		let inventoryitem: Inventory = {
			_id: id,
			name: name,
			description: description,
			quantity: +quantity,
			created_on: created_on
		};

		if (validateInventoryItem(inventoryitem)) {
			alert('Item Updated!');
			updateInventory(inventoryitem);
			goto('/inventory/view/' + id);
		} else {
			status_message = 'Name is a required field.';
		}
	}
</script>

<h2 class="text-2xl m-4">Update Item</h2>

{#if inventoryItemMessage.status == Status.SUCCESS && inventoryItemMessage.item}
	<InventoryForm
		bind:id
		bind:name
		bind:description
		bind:quantity
		bind:created_on
		bind:status_message
		{handleSubmit}
		button_text={'Update Item'}
		disable_id={true}
	/>
{:else}
	<div class="pl-2 flex flex-col md:flex-row">
		<div class="flex-auto p-4 shadow-lg">
			<h3 class="text-lg font-mono pt-2 font-medium">{inventoryItemMessage.message}</h3>
		</div>
	</div>
{/if}
