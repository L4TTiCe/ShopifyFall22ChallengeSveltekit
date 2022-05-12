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

    export let inventoryItems: Inventory[];
</script>

Inventory has {inventoryItems.length} items.

{#each inventoryItems as item}
    <div class="pl-2 flex flex-col md:flex-row">
        <div class="flex-auto p-4 shadow-lg">
            <h3 class="text-lg font-mono pt-2 font-medium">{item.name}</h3>
            <ul class="pl-4">
                <li class="underline hover:no-underline hover:text-blue-800">
                    <a href="/inventory/view/{item._id}">ID: {item._id}</a>
                </li>
                <li>
                    <span>Description: {item.description}</span>
                </li>
                <li>
                    <span>Qty: {item.quantity}</span>
                </li>
                <li>
                    <span>created on: {item.created_on}</span>
                </li>
            </ul>
        </div>
    </div>
{/each}