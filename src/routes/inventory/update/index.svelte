<script context="module">
    export async function load() {
        const inventoryItems = getAllItems();
        return {
            props: {
                inventoryItems
            }
        }
    }
</script>

<script lang="ts">
    import {getAllItems} from '$lib/dao/inventoryDao';
    import type { Inventory } from '$lib/models/inventory';

    let selected: string;

    export let inventoryItems: Inventory[];
</script>

<h2 class="text-2xl m-4">Update Item</h2>
<form class="w-full max-w-lg mx-4">
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-username"
            >
                Selected Item
            </label>
            <select
                bind:value={selected}
                disabled={inventoryItems.length == 0}
                class="{!selected
                    ? 'border-red-500'
                    : 'border-gray-200'} block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-username"
                placeholder="Choose group to update"
            >
                <option value="" selected disabled hidden
                    >{inventoryItems.length == 0 ? 'No Groups' : 'Choose Item'}</option
                >
                {#each inventoryItems as item}
                    <option value={item._id}>
                        {item.name} x{item.quantity} [{item._id}]
                    </option>
                {/each}
            </select>
        </div>
    </div>
</form>