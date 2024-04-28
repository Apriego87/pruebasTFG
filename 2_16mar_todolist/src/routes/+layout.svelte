<script lang="ts">
	import '../app.pcss'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import { Button } from '$lib/components/ui/button'

	console.log($page)

	export let data: PageData
</script>

<header>
	<div class="flex h-[10vh] items-center justify-between bg-black p-5">
		<h1 class="text-2xl font-bold text-white">{$page.data.title}</h1>
		<div class="flex flex-row">
			{#if data.logged}
				<Button variant="link" class="text-white" href="/board">Tablón de Anuncios</Button>
				<Button variant="link" class="text-white" href="/">Lista de Tareas</Button>
				<Button variant="link" class="text-white" href="/userArea">Área de Empleados</Button>
				<form method="POST" action="?/signout" use:enhance>
					<Button variant="outline" type="submit">Cerrar sesión</Button>
				</form>
			{/if}
		</div>
	</div>
</header>

<slot />
