<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import * as Card from '$lib/components/ui/card'

	import SuperDebug, { superForm } from 'sveltekit-superforms'
	import type { PageData } from '../$types'
	import * as Alert from '$lib/components/ui/alert'
	export let data: PageData

	const { form, errors, allErrors, constraints, message, enhance } = superForm(data.form, {
		onError({ result }) {
			$message = result.error.message || 'error desconocido'
		}
	})
</script>
<!-- 

<SuperDebug data={$form} />


{#if $allErrors.length}
	<ul>
		{#each $allErrors as error}
			<li>
				<b>{error.path}:</b>
				{error.messages.join('. ')}
			</li>
		{/each}
	</ul>
{/if}
 -->

<main class="flex items-center justify-center">
	<div class="w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Registro de Usuarios</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" class="w-full" use:enhance>
					<div>
						<Label for="name">Nombre:</Label>
						<Input
							type="text"
							id="name"
							name="name"
							aria-invalid={$errors.name ? 'true' : undefined}
							bind:value={$form.name}
						/>
						{#if $errors.name}
							<small class="invalid">{$errors.name}</small>
						{/if}
					</div>

					<div>
						<Label for="username">Usuario:</Label>
						<Input
							type="text"
							id="username"
							name="username"
							aria-invalid={$errors.username ? 'true' : undefined}
							bind:value={$form.username}
						/>
						{#if $errors.username}
							<small class="invalid">{$errors.username}</small>
						{/if}
					</div>

					<div>
						<Label for="password">Contraseña:</Label>
						<Input
							type="password"
							id="password"
							name="password"
							aria-invalid={$errors.password ? 'true' : undefined}
							bind:value={$form.password}
						/>
						{#if $errors.password}
							<small class="invalid">{$errors.password}</small>
						{/if}
					</div>

					<div>
						<Label for="confirmPassword">Confirmar contraseña:</Label>
						<Input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							aria-invalid={$errors.confirmPassword ? 'true' : undefined}
							bind:value={$form.confirmPassword}
						/>
						{#if $errors.confirmPassword}
							<small class="invalid">{$errors.confirmPassword}</small>
						{/if}
					</div>

					<Button class="mt-4" type="submit">Registrar</Button>
				</form>
			</Card.Content>
			<Card.Footer>
				<p>Ya tienes una cuenta? <a href="/login"><u>Inicia sesión</u></a></p>
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
