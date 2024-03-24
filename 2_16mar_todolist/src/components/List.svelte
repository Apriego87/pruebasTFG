<script lang="ts">
	import { Label } from '$lib/components/ui/label'
	import { Checkbox } from '$lib/components/ui/checkbox'
	import { Button } from '$lib/components/ui/button'
	import * as Accordion from '$lib/components/ui/accordion/index.js'
	import { Separator } from '$lib/components/ui/separator'
	import { fade } from 'svelte/transition'
	import { AllSides } from 'svelte-radix'

	// COMPROBAR CORRECTO FUNCIONAMIENTO
	export let data: { allTasks: Task[] }

	interface Task {
		taskID: string
		checked: boolean
		description: string
		status: boolean
	}

	function que(item: Task) {
		try {
			fetch('?/update', {
				method: 'POST',
				body: JSON.stringify(item)
			})
		} catch (error) {
			console.error('Error fetching data:', error)
			return {
				status: 500,
				error: 'Internal Server Error'
			}
		}
	}
</script>

<div class="w-full">
	{#if data.status !== 404}
		<div class="mb-5 flex flex-col justify-center p-2">
			{#if data.allTasks.every((tarea) => tarea.checked)}
				<div>
					<p><i>No hay tareas por hacer!</i></p>
				</div>
			{:else}
				{#each data.allTasks as item (item.taskID)}
					{#if !item.checked}
						<div transition:fade class="m-2 flex items-center space-x-2">
							<Checkbox
								bind:checked={item.checked}
								onCheckedChange={() => {
									que(item)
								}}
								id={item.taskID}
							/>
							<Label for={item.taskID}>
								<p>{item.description}</p>
							</Label>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
		<Separator />
		<div class="flex flex-col justify-center p-2">
			<Accordion.Root class="w-full">
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Tareas completadas</Accordion.Trigger>
					{#each data.allTasks as item (item.taskID)}
						{#if item.checked}
							<Accordion.Content>
								<div class="mx-2 flex items-center space-x-2">
									<Checkbox
										bind:checked={item.checked}
										onCheckedChange={() => {
											que(item)
										}}
										id={item.taskID}
									/>
									<Label for={item.taskID}>
										<p>{item.description}</p>
									</Label>
								</div>
							</Accordion.Content>
						{/if}
					{/each}

					{#if data.allTasks.some((tarea) => tarea.checked)}
						<Accordion.Content>
							<form method="POST" class="w-full" action="?/deleteChecked">
								<Button type="submit" class="w-full" id="delButton">Borrar completadas</Button>
							</form>
						</Accordion.Content>
					{:else}
						<Accordion.Content>
							<div>
								<p><i>Las tareas completadas aparecerán aquí</i></p>
							</div>
						</Accordion.Content>
					{/if}
				</Accordion.Item>
			</Accordion.Root>
		</div>
	{/if}
</div>
