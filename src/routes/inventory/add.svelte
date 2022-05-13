<script lang="ts">
    import type { Inventory } from '$lib/models/inventory';
    import {addInventory} from '$lib/dao/inventoryDao'
	import InventoryForm from '$lib/components/InventoryForm.svelte';

    let id: string = '';
	let name: string = '';
	let description: string = '';

	let quantity: string = '';
	let created_on: string = new Date().toISOString().slice(0, 16);

	let status_message = '';

    function validateInventoryItem(item: Inventory): boolean {
        if (item._id == '' || item.name == '') {
            return false;
        } else {
            return true;
        }
    }

	function resetData() {
		id = '';
		name = '';
		description = '';
		quantity = '';
		created_on = new Date().toISOString().slice(0, 16); 
	}

    function handleSubmit() {
        let inventoryitem: Inventory = {
            _id: id,
            name: name,
            description: description,
            quantity: +quantity,
            created_on: created_on
        }

        if (validateInventoryItem(inventoryitem)) {
            alert('Item Created!');
			addInventory(inventoryitem);
			resetData();
        } else {
			status_message = 'ID and name are required fields.';
		}
    }
</script>

<div>
	<h2 class="text-2xl m-4">Add Inventory Item</h2>
	<InventoryForm 
		bind:id
		bind:name
		bind:description
		bind:quantity
		bind:created_on

		bind:status_message
		handleSubmit = {handleSubmit}
		button_text = {"Add Item"}
	/>
</div>