<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Card from '$lib/components/ui/card/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { tasks } from './tasks'
	import { onMount } from 'svelte'

	export let data

	let i = 0

	onMount(() => {
		const interval = setInterval(() => {
			i += 1
			i %= tasks.length
		}, 2500)

		return () => {
			clearInterval(interval)
		}
	})
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<Card.Root class="w-1/2 max-w-[600px]">
		<Card.Header>
			<Card.Title>Lista de Tareas</Card.Title>
		</Card.Header>
		<Card.Content class="flex-column flex w-full flex-wrap items-center justify-center">
			<form method="POST" class="flex w-full flex-row">
				<Input class="mr-2 rounded-lg" type="text" name="task" placeholder={tasks[i] || ''} />
				<Button class="rounded-lg" type="submit">Añadir</Button>
			</form>
			<div class="centered mt-5 w-full">
				{#each data.todos as todo (todo.id)}
					<div class="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
						{#if !todo.done}
							<span class="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
						{/if}
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">
								{todo.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</div>
