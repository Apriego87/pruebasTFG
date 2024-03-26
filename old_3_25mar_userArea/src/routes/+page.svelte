<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex h-[10vh] flex-col justify-center bg-black p-5">
	<h1 class="text-2xl font-bold text-white">Área de usuarios</h1>
</div>


<div>
	{#if data.users}
		{#each data.users as field}
			<p>{field.name}</p>
			<img src="{field.pfp}" alt="pfp">
		{/each}
	{/if}
</div>