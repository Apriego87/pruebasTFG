<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import * as Card from '$lib/components/ui/card'

	import { superForm } from 'sveltekit-superforms'
	import type { PageData } from '../$types'

	export let data: PageData

	const { form, errors, constraints, message, enhance } = superForm(data.form, {})
</script>

{#if $message}<h3>{$message}</h3>{/if}

<main class="flex items-center justify-center">
	<div class="w-1/2">
		<Card.Root>
			<Card.Header class="text-center underline">
				<Card.Title>Inicio de Sesión</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance class="w-full">
					<div class="flex flex-row">
						<div class="m-2 w-1/2">
							<Label for="username">Usuario:</Label>
							<Input
								type="text"
								id="username"
								name="username"
								aria-invalid={$errors.username ? 'true' : undefined}
								bind:value={$form.username}
								{...$constraints.username}
								required
							/>
							{#if $errors.username}<span class="invalid">{$errors.username}</span>{/if}
						</div>

						<div class="m-2 w-1/2">
							<Label for="password">Contraseña:</Label>
							<Input
								type="password"
								id="password"
								name="password"
								aria-invalid={$errors.password ? 'true' : undefined}
								bind:value={$form.password}
								{...$constraints.password}
							/>
							{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
						</div>
					</div>

					<div class="w-full text-center">
						<Button class="mt-4" type="submit">Iniciar sesión</Button>
					</div>
				</form>
			</Card.Content>
			<Card.Footer>
				<div class="w-full text-center">
					<p>Todavía no tienes una cuenta? <a href="/register"><u>Regístrate</u></a></p>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</main>

<style>
	main {
		height: 100vh;
	}

	.invalid {
		color: red;
	}
</style>
