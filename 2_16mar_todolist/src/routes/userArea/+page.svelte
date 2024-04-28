<script lang="ts">
	import type { PageData } from './$types'
	import * as Avatar from '$lib/components/ui/avatar/index.js'
	import * as HoverCard from '$lib/components/ui/hover-card/index.js'
	import { SewingPinFilled } from 'svelte-radix'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import { createSearchStore, searchHandler } from '$lib/stores/search'
	import { onDestroy } from 'svelte'

	import * as Card from '$lib/components/ui/card/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { fade } from 'svelte/transition'
	import { enhance } from '$app/forms'

	export let data: PageData

	const searchUsers = data.users.map((user) => ({
		...user,
		searchTerms: `${user.name} ${user.email} ${user.role} ${user.location}`
	}))

	const searchStore = createSearchStore(searchUsers)

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model))

	onDestroy(() => {
		unsubscribe()
	})

	function addParams(param: string) {
		// Check if the parameter is not already in the array
		if (!$searchStore.additionalSearchTerms.includes(param)) {
			// Add the parameter to the array
			$searchStore.additionalSearchTerms = [...$searchStore.additionalSearchTerms, param]
		}
	}

	function removeSearchTerm(term: string) {
		searchStore.update((store) => ({
			...store,
			additionalSearchTerms: store.additionalSearchTerms.filter((t) => t !== term)
		}))
	}
</script>

<!-- <div class="flex h-[10vh] justify-between bg-black p-5">
	<h1 class="text-2xl font-bold text-white">Área de Empleados</h1>
	<div class="flex flex-row">
		<Button href="/">Lista de Tareas</Button>
		{#if data.logged}
			<form method="POST" action="?/signout" use:enhance>
				<Button variant="outline" type="submit">Cerrar sesión</Button>
			</form>
		{:else}
			<Button href="/login">Iniciar sesión</Button>
			<Button href="/register">Registrarse</Button>
		{/if}
	</div>
</div> -->

<div id="cont" class="flex h-[90vh] w-full flex-col items-center justify-evenly">
	<Card.Root class="w-1/3 min-w-[768px]">
		<Card.Header>
			<Card.Title>Buscador de Empleados</Card.Title>
			<Card.Description>Puedes buscar por nombre, e-mail, ubicación o rol.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Input type="search" placeholder="Buscar..." bind:value={$searchStore.search} />
			{#if $searchStore.additionalSearchTerms.length != 0}
				<div id="terms" class="mt-4 flex w-full flex-row justify-center">
					{#each $searchStore.additionalSearchTerms as term (term)}
						<Badge class="mr-2"
							><button on:click={() => removeSearchTerm(term)}>{term}</button></Badge
						>
					{/each}
				</div>
			{/if}
		</Card.Content>
		{#if $searchStore.search != '' || $searchStore.additionalSearchTerms.length != 0}
			<Card.Footer>
				<div
					transition:fade
					class="flex max-h-[50vh] flex-row flex-wrap justify-between overflow-auto px-3"
				>
					{#each $searchStore.filtered as field}
						<HoverCard.Root>
							<div class="m-4 ml-0">
								<HoverCard.Trigger
									class="rounded-sm border border-gray-500 p-2 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
									>{field.name} {field.surname}</HoverCard.Trigger
								>
							</div>
							<HoverCard.Content class="w-80">
								<div class="flex justify-around space-x-4">
									<Avatar.Root>
										<Avatar.Image src={field.pfp} />
										<Avatar.Fallback>SK</Avatar.Fallback>
									</Avatar.Root>
									<div class="space-y-1">
										<h4 class="text-sm font-semibold">{field.name}</h4>
										<p class="text-sm">{field.email}</p>
										<div class="flex items-center pt-2">
											<SewingPinFilled class="mr-2 h-4 w-4 opacity-70" />{' '}
											<span class="text-muted-foreground text-xs"
												><button
													on:click={() => {
														addParams(field.location)
													}}>{field.location}</button
												></span
											>
										</div>
										<div class="flex items-center pt-2">
											<Badge
												><button
													on:click={() => {
														addParams(field.role)
													}}>{field.role}</button
												></Badge
											>
										</div>
									</div>
								</div>
							</HoverCard.Content>
						</HoverCard.Root>
					{/each}
				</div>
			</Card.Footer>
		{/if}
	</Card.Root>
</div>
