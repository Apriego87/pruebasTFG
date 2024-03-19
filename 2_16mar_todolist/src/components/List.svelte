<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte'
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte'
	import Button from '$lib/components/ui/button/button.svelte'

	export let data

	function que(item) {
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
        {#each data.allTasks as item (item.taskID)}
            <div class="m-2 flex items-center space-x-2">
                <Checkbox
                    bind:checked={item.checked}
                    onCheckedChange={() => {
                        que(item)
                    }}
                    id="{item.taskID}"
                />
                <Label for="{item.taskID}">
                    <p>{item.description}</p>
                </Label>
            </div>
        {/each}
        <div class="flex w-full justify-end">
            <Button>Borrar seleccionadas</Button>
        </div>
    {/if}
</div>
