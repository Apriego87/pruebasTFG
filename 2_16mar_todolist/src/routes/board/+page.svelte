<script lang="ts">
	// import Button from '$lib/components/ui/button/button.svelte'
	import { Plus } from 'svelte-radix'

	import { Button } from '$lib/components/ui/button'
	import * as Dialog from '$lib/components/ui/dialog'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import * as Select from '$lib/components/ui/select'
	import { Textarea } from '$lib/components/ui/textarea'

	import NoteComponent from '../../components/NoteComponent.svelte'
	import type { PageData } from '../$types'

	export let data: PageData

	console.log(data.notes)
</script>

<!-- npm install -g dotenv-cli -->

<div>
	<Dialog.Root>
		<Dialog.Trigger
			><Button class="absolute top-25 right-5">
				<Plus class="mr-2 h-4 w-4" />
				Añadir anuncio
			</Button></Dialog.Trigger
		>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>
					<p>Añade un anuncio</p>
				</Dialog.Title>
				<Dialog.Description>
					<p>Crea un aviso, recordatorio, o simplemente deja un mensaje bonito :)</p>
				</Dialog.Description>
			</Dialog.Header>
			<form method="POST" action="?/create">
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="title" class="text-right">Título</Label>
						<Input id="title" name="title" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right">Descripción</Label>
						<Textarea id="description" name="description" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="category" class="text-right">Categoría</Label>
						<Select.Root>
							<Select.Trigger class="w-[200px]">
								<Select.Value placeholder="categoría" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="informatica">Informática</Select.Item>
								<Select.Item value="rrhh">RRHH</Select.Item>
								<Select.Item value="general">General</Select.Item>
							</Select.Content>
							<Select.Input name="category" />
						</Select.Root>
					</div>
				</div>

				<Dialog.Footer>
					<Button type="submit">Guardar</Button>
				</Dialog.Footer>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>

<div class="h-full w-full p-5">
	<h1 class="my-5 text-center text-2xl font-bold">Anuncios actuales</h1>
	<div class="flex flex-row flex-wrap justify-between">
		{#each data.notes as note (note)}
			<div class="m-5 w-1/5">
				<NoteComponent {note} />
			</div>
		{/each}
	</div>
</div>
