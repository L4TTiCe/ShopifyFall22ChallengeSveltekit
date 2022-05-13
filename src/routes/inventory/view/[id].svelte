<script lang="ts">
    import { goto } from '$app/navigation';

    import { page } from '$app/stores';
    import { getItemById } from '$lib/dao/inventoryDao';
    import type { Message } from '$lib/message';
    import { Status } from '$lib/status';

    export const inventoryItemMessage: Message = getItemById($page.params.id);

    function handleUpdate(): void {
        goto("/inventory/update/" + $page.params.id);
    }
</script>

<li class="underline hover:no-underline hover:text-blue-800">
    <a href="/inventory/view">Back to All inventory Items.</a>
</li>

{#if inventoryItemMessage.status == Status.SUCCESS && inventoryItemMessage.item}
    <div class="pl-2 flex flex-col md:flex-row">
        <div class="flex-auto p-4 shadow-lg">
            <h3 class="text-lg font-mono pt-2 font-medium">{inventoryItemMessage.item.name}</h3>
            <ul class="pl-4">
                <li class="underline hover:no-underline hover:text-blue-800">
                    <a href="{inventoryItemMessage.item._id}">ID: {inventoryItemMessage.item._id}</a>
                </li>
                <li>
                    <span>Description: {inventoryItemMessage.item.description}</span>
                </li>
                <li>
                    <span>Qty: {inventoryItemMessage.item.quantity}</span>
                </li>
                <li>
                    <span>created on: {inventoryItemMessage.item.created_on}</span>
                </li>
            </ul>
            <div class="content-center my-4 -mx-3">
                <div class="px-3">
                    <button
                        on:click={handleUpdate}
                        class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                        type="button"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="pl-2 flex flex-col md:flex-row">
        <div class="flex-auto p-4 shadow-lg">
            <h3 class="text-lg font-mono pt-2 font-medium">{inventoryItemMessage.message}</h3>
        </div>
    </div>
{/if}