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

<div class="p-4 m-4">
    <span class="text-lg font-mono pt-2 font-bold">Table view</span>
</div>

<table class="table-auto border-collapse border border-slate-500">
    <thead>
        <tr>
            <th class="border border-slate-600 p-4 text-left">ID</th>
            <th class="border border-slate-600 p-4 text-left">Name</th>
            <th class="border border-slate-600 p-4 text-left">Description</th>
            <th class="border border-slate-600 p-4 text-left">Qty.</th>
            <th class="border border-slate-600 p-4 text-left">Created on</th>
            <th class="border border-slate-600 p-4 text-left">View</th>
            <th class="border border-slate-600 p-4 text-left">Update</th>
        </tr>
    </thead>
    <tbody>
        {#each inventoryItems as item}
        <tr>
            <td class="border border-slate-700 p-2 text-left">{item._id}</td>
            <td class="border border-slate-700 p-2 text-left">{item.name}</td>
            <td class="border border-slate-700 p-2 text-left">{item.description}</td>
            <td class="border border-slate-700 p-2 text-left">{item.quantity}</td>
            <td class="border border-slate-700 p-2 text-left">{item.created_on}</td>
            <td class="border border-slate-700 p-2 text-left"><a class="underline hover:no-underline hover:text-blue-800" href="/inventory/view/{item._id}">View</a></td>
            <td class="border border-slate-700 p-2 text-left"><a class="underline hover:no-underline hover:text-blue-800" href="/inventory/update/{item._id}">Update</a></td>
        </tr>
        {/each}
    </tbody>
</table>

