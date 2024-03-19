<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import AddTodo from '../components/AddTodo.svelte'
	import List from '../components/List.svelte'
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components/ui/button'

	export let data
</script>

<main>
	<div class="block absolute top-10 right-10">
		<form method="post" action="?/signOut" use:enhance>
			<Button>Cerrar sesión</Button>
		</form>
	</div>
	<div class="w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Lista de Tareas</Card.Title>
				<Card.Description>Añade tareas a la lista</Card.Description>
			</Card.Header>
			<Card.Content>
				<AddTodo></AddTodo>
			</Card.Content>
			<Card.Footer class="flex flex-col items-start">
				{#if data !== undefined}
					<List {data}></List>
				{:else}
					<p>vacío</p>
				{/if}
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
