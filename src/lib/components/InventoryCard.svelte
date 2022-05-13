<script lang="ts">
    export let name: string | undefined;
    export let id: string;
    export let description: string | undefined;
    export let quantity: number | string | undefined;
    export let created_on: string | undefined;

    export let show_buttons: boolean = false;
    export let handleUpdate: any = null;
    export let handleDelete: any = null;
</script>

    <div class="flex-auto p-4 shadow-lg">
        <h3 class="text-lg font-mono pt-2 font-medium">{name}</h3>
        <ul class="pl-4">
            <li class="underline hover:no-underline hover:text-blue-800">
                <a href="/inventory/view/{id}">ID: {id}</a>
            </li>
            <li>
                <span>Description: {description}</span>
            </li>
            <li>
                <span>Qty: {quantity?.toString()}</span>
            </li>
            <li>
                <span>Created on: {created_on}</span>
            </li>
        </ul>
        {#if show_buttons}

        <div class="inline-flex">
            <button
                on:click={handleUpdate}
                class="block shadow tracking-wide bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2"
                type="button"
            >
                Update
            </button>
            <button
                on:click={handleDelete}
                class="block shadow tracking-wide bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-2"
                type="button"
            >
                Delete
            </button>
        </div>
        {/if}
    </div>