<script lang="ts">
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'

	import { tasks } from '$lib/tasks'

	import { onMount } from 'svelte'

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

<div>
	<form method="POST" action="?/send">
		<div class="flex flex-row items-center justify-center">
			<Input class="mr-2 rounded-lg" type="text" name="task" placeholder={tasks[i] || ''}></Input>
			<Button class="rounded-lg" type="submit">Añadir</Button>
		</div>
	</form>
</div>
