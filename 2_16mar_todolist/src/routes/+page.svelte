<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import AddTodo from '../components/AddTodo.svelte'
	import List from '../components/List.svelte'
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components/ui/button'
	import type { PageData } from './$types'

	export let data: PageData
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
			</Card.Content>
			<Card.Footer class="flex flex-col items-start pb-0">
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
