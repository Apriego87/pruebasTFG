<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import AddTodo from '../components/AddTodo.svelte';

	export let form;
</script>

<main>
	<div class="w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Lista de Tareas</Card.Title>
				<Card.Description>Añade tareas a la lista</Card.Description>
			</Card.Header>
			<Card.Content>
				<AddTodo></AddTodo>
				{#if form?.success}
					<p class="hidden">{console.log(form?.lmao)}</p>
				{/if}
			</Card.Content>
			<Card.Footer>
				<p>Card Footer</p>
			</Card.Footer>
		</Card.Root>
	</div>
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
