<script lang="ts">
    import Nav from "$lib/components/nav.svelte";

	const app_name = 'Inventory Management';
</script>

<svelte:head>
	<title>{app_name}</title>
</svelte:head>

<Nav/>

<div class="m-8 p-8">
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>