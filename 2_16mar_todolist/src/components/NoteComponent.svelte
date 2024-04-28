<script lang="ts">
	export let note
	import * as Card from '$lib/components/ui/card/index.js'

	var bgColor = ''

	// console.log(note)

	if (note.category === 'rrhh') {
		bgColor = 'bg-blue-300'
	} else if (note.category === 'informatica') {
		bgColor = 'bg-red-300'
	} else {
		bgColor = 'bg-green-300'
	}
</script>

<!-- <div>
	<p>{note.title}</p>
	<p>{note.description}</p>
</div> -->

<Card.Root class="card text-center {bgColor}">
	<Card.Header>
		<Card.Title class="text-xl font-bold">{note.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{note.description}</p>
	</Card.Content>
	<Card.Footer>
		<small><p>De: <i>{note.creatorName}</i></p></small>
	</Card.Footer>
</Card.Root>
