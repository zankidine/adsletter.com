<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Adsletter</title>
</svelte:head>


<div class="flex flex-col min-h-dvh">
	{@render children?.()}
</div>