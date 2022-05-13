<script>
	import { page } from '$app/stores';

	const active_classes =
		'text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white';
	const inactive_classes =
		'text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4';
	const disabled_classes = 'block py-2 px-4 text-gray-400 cursor-not-allowed';

	let active = '';
	function refresh() {
		const url = $page.url.pathname;
		if (url.includes('add')) {
			active = 'add';
		} else if (url.includes('delete')) {
			active = 'delete';
		} else if (url.includes('update')) {
			active = 'update';
		} else if (url.includes('log')) {
			active = 'log';
		} else {
			active = 'view';
		}
	}
	refresh();

	$: if ($page.url.pathname) refresh();
</script>

<ul class="flex my-3">
	<li class="flex-1 mr-2">
		<a class={active == 'view' ? active_classes : inactive_classes} href="/inventory/view"
			>View Inventory</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a class={active == 'add' ? active_classes : inactive_classes} href="/inventory/add"
			>Add Inventory</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a class={active == 'update' ? active_classes : inactive_classes} href="/inventory/update"
			>Update Inventory</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a class={active == 'delete' ? active_classes : inactive_classes} href="/inventory/delete"
			>Delete from Inventory</a
		>
	</li>
	<li class="flex-1 mr-2">
		<a class={active == 'log' ? active_classes : inactive_classes} href="/inventory/log"
			>Deletion Log</a
		>
	</li>
</ul>

<slot />
